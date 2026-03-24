const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reporterName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    relation: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    personName: { type: String, required: true, trim: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);