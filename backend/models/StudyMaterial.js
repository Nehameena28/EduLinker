import mongoose from "mongoose";

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

export default mongoose.model("StudyMaterial", StudyMaterialSchema);
