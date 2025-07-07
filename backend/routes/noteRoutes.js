const express = require("express");
const router = express.Router();
const Note = require("../models/Note"); // import your Note model


router.get("/all", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

module.exports = router;
