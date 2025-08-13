const mongoose = require("mongoose");

const StudyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },

  pdf: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },

  cover: {
    url: { type: String, required: false },
    public_id: { type: String, required: false }
  },

  uploadedBy: { type: String, required: true }, // seller's email or id
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StudyMaterial", StudyMaterialSchema);