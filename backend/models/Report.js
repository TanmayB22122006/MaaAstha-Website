const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reporterName: String,
  phone: String,
  relation: String,
  message: String,
  personName: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);