const express = require("express");
const Report = require("../models/Report"); // ✅ Fixed Import

const router = express.Router();

// ✅ CREATE REPORT (Frontend se data save karne ke liye)
router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.json({ success: true, message: "Report saved successfully" });
  } catch (err) {
    console.error("Error saving report:", err);
    res.status(500).json({ success: false, message: "Failed to save report" });
  }
});

// ✅ GET ALL REPORTS (Admin Dashboard pe dikhane ke liye)
router.get("/all", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reports }); // ✅ Frontend ab isko easily read kar lega
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;