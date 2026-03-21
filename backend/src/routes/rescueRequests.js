const express = require("express");
const path = require("path");
const multer = require("multer");

const RescueRequest = require("../models/RescueRequest");

const router = express.Router();

const uploadsDir = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const safeBase = path
      .basename(file.originalname)
      .replace(/[^\w.\-]+/g, "_")
      .slice(0, 80);
    const ext = path.extname(safeBase) || "";
    const base = safeBase.replace(new RegExp(`${ext}$`), "");
    cb(null, `${Date.now()}_${Math.random().toString(16).slice(2)}_${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.get("/rescue-requests", async (req, res, next) => {
  try {
    const items = await RescueRequest.find().sort({ createdAt: -1 }).limit(500);
    res.json({ ok: true, data: items });
  } catch (err) {
    next(err);
  }
});

router.post("/rescue-requests", upload.single("photo"), async (req, res, next) => {
  try {
    const { location, condition, reporterName = "", reporterPhone } = req.body || {};
    if (!location || !condition || !reporterPhone) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const photoUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const doc = await RescueRequest.create({
      location,
      condition,
      reporterName,
      reporterPhone,
      photoUrl,
    });

    res.status(201).json({ ok: true, data: doc });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

