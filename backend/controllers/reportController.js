const Report = require("../models/Report");

const addReport = async (req, res) => {
  try {
    const newReport = await Report.create(req.body);
    res.status(201).json({ success: true, data: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

module.exports = { addReport, getReports, deleteReport };
