const mongoose = require("mongoose");

const missingPersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    missingSince: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MissingPerson", missingPersonSchema);