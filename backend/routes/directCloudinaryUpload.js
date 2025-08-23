const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const StudyMaterial = require("../models/StudyMaterial.js");

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage instead of CloudinaryStorage
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    console.log("=== DIRECT UPLOAD REQUEST RECEIVED ===");
    console.log("Body:", req.body);
    console.log("File:", req.file ? 'Present' : 'Missing');
    
    const { title, description, category, price, uploadedBy } = req.body;

    if (!uploadedBy) {
      return res.status(400).json({ error: "Uploader email is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }

    // Check file size (Cloudinary free tier limit: 10MB)
    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ 
        error: `File size too large. Maximum allowed: 10MB. Your file: ${(req.file.size / (1024 * 1024)).toFixed(1)}MB` 
      });
    }

    console.log("=== UPLOADING TO CLOUDINARY DIRECTLY ===");
    console.log("File size:", req.file.size);
    console.log("File mimetype:", req.file.mimetype);

    // Upload directly to Cloudinary
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const publicId = `pdf-${uniqueSuffix}`;

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "edulinker-pdfs",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary upload result:', result);
            resolve(result);
          }
        }
      );
      
      uploadStream.end(req.file.buffer);
    });

    console.log("=== CLOUDINARY UPLOAD SUCCESS ===");
    console.log("Public ID:", uploadResult.public_id);
    console.log("URL:", uploadResult.secure_url);

    const materialData = {
      title,
      description,
      category,
      price: parseFloat(price),
      uploadedBy,
      pdf: {
        fullUrl: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      }
    };
    
    console.log("=== SAVING TO DATABASE ===");
    const newMaterial = new StudyMaterial(materialData);
    await newMaterial.save();
    
    console.log("=== SUCCESS ===");
    console.log("Material ID:", newMaterial._id);
    
    res.status(201).json({ 
      message: "Material uploaded successfully to Cloudinary", 
      id: newMaterial._id, 
      material: newMaterial 
    });
  } catch (err) {
    console.error("=== UPLOAD ERROR ===");
    console.error("Error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

module.exports = router;