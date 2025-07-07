const mongoose = require("mongoose");


const StudyMaterialSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  pdf: {
    data: Buffer,
    contentType: String,
  },
  cover: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudyMaterial", StudyMaterialSchema);
