const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const StudyMaterial = require("../models/StudyMaterial.js");

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for full PDFs
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "edulinker-pdfs",
    resource_type: "raw", // for PDFs
    allowed_formats: ["pdf"],
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return `pdf-${uniqueSuffix}`;
    },
  },
});

// Configure Cloudinary storage for preview PDFs
const previewStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "edulinker-previews",
    resource_type: "raw",
    allowed_formats: ["pdf"],
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return `preview-${uniqueSuffix}`;
    },
  },
});



const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    console.log("=== UPLOAD REQUEST RECEIVED ===");
    console.log("Body:", req.body);
    console.log("File:", req.file ? 'Present' : 'Missing');
    
    const { title, description, category, price, uploadedBy } = req.body;

    if (!uploadedBy) {
      return res.status(400).json({ error: "Uploader email is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }

    console.log("=== CLOUDINARY FILE INFO ===");
    console.log("Filename:", req.file.filename);
    console.log("Path:", req.file.path);
    console.log("Size:", req.file.size);

    const materialData = {
      title,
      description,
      category,
      price: parseFloat(price),
      uploadedBy,
      pdf: {
        fullUrl: req.file.path, // Cloudinary URL
        public_id: req.file.filename,
      }
    };
    
    console.log("=== SAVING TO DATABASE ===");
    console.log("Material data:", materialData);
    
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
    console.error("Stack:", err.stack);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

module.exports = router;