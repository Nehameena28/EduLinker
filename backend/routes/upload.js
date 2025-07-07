import express from "express";
import multer from "multer";
import StudyMaterial from "../models/StudyMaterial.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.fields([{ name: "pdf" }, { name: "cover" }]), async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const newMaterial = new StudyMaterial({
      title,
      description,
      category,
      price,
      pdf: {
        data: req.files["pdf"][0].buffer,
        contentType: req.files["pdf"][0].mimetype,
      },
      cover: {
        data: req.files["cover"][0].buffer,
        contentType: req.files["cover"][0].mimetype,
      },
    });

    await newMaterial.save();
    res.status(201).json({ message: "Material uploaded successfully." });
  } catch (err) {
    console.error("Error uploading material:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
