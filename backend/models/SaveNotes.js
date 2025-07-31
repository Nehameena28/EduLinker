const mongoose = require("mongoose");

const SavedNoteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: String,
  description: String,
  category: String,
  price: String,       
  fileName: String,
  previewUrl: String,
});

module.exports = mongoose.model("SavedNote", SavedNoteSchema);
