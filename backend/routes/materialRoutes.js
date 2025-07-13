// routes/materialRoutes.js
import express from "express";
import StudyMaterial from "../models/StudyMaterial.js";

const router = express.Router();

// GET all study materials
router.get("/materials", async (req, res) => {
    console.log("📥 GET /api/materials hit");
  try {
    const materials = await StudyMaterial.find();
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Failed to fetch materials" });
  }
});

router.delete("/materials/:id", async (req, res) => {
  try {
    const deleted = await StudyMaterial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (err) {
    console.error("Error deleting material:", err);
    res.status(500).json({ error: "Failed to delete material" });
  }
});


export default router;
