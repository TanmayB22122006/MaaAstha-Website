const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    location: { type: String, required: true, trim: true },
    identificationMarks: { type: String, default: "", trim: true },
    clothing: { type: String, default: "", trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, default: "Sheltered", trim: true },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", PersonSchema);

