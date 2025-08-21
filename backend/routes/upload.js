const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const StudyMaterial = require("../models/StudyMaterial.js");
const { createPreviewPdf } = require("../utils/pdfProcessor");

const router = express.Router();

// Create uploads directories if they don't exist
const uploadsDir = path.join(__dirname, '../uploads');
const previewsDir = path.join(__dirname, '../uploads/previews');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    console.log("Upload request received");
    console.log("Request body:", req.body);
    console.log("Files:", req.files ? Object.keys(req.files) : 'No files');
    
    const { title, description, category, price, uploadedBy } = req.body;

    if (!uploadedBy) {
      console.log("Missing uploadedBy field");
      return res.status(400).json({ error: "Uploader email is required" });
    }

    if (!req.file) {
      console.log("Missing PDF file");
      return res.status(400).json({ error: "PDF file is required" });
    }

    console.log("File saved locally:");
    console.log("PDF:", req.file.filename);

    // Create preview PDF
    const originalPdfPath = path.join(uploadsDir, req.file.filename);
    const previewFilename = `preview_${req.file.filename}`;
    const previewPdfPath = path.join(previewsDir, previewFilename);
    
    console.log("Creating preview PDF...");
    const previewResult = await createPreviewPdf(originalPdfPath, previewPdfPath, 3);
    
    if (!previewResult.success) {
      console.error("Failed to create preview:", previewResult.error);
      return res.status(500).json({ error: "Failed to create PDF preview" });
    }
    
    console.log(`Preview created: ${previewResult.previewPages} pages from ${previewResult.totalPages} total`);

    const materialData = {
      title,
      description,
      category,
      price: parseFloat(price),
      uploadedBy,
      pdf: {
        fullUrl: `/uploads/${req.file.filename}`,
        previewUrl: `/uploads/previews/${previewFilename}`,
        public_id: req.file.filename
      }
    };
    
    console.log("Creating new material with data:", materialData);
    const newMaterial = new StudyMaterial(materialData);
    
    console.log("Saving to MongoDB...");
    await newMaterial.save();
    console.log("Material saved successfully:", newMaterial._id);
    
    res.status(201).json({ message: "Material uploaded successfully.", id: newMaterial._id, material: newMaterial });
  } catch (err) {
    console.error("Error uploading material:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

module.exports = router;




