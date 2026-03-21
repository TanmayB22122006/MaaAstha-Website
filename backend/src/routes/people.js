const express = require("express");
const path = require("path");
const multer = require("multer");

const Person = require("../models/Person");

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

router.get("/people", async (req, res, next) => {
  try {
    const people = await Person.find().sort({ createdAt: -1 }).limit(200);
    res.json({ ok: true, data: people });
  } catch (err) {
    next(err);
  }
});

router.post("/people", upload.single("image"), async (req, res, next) => {
  try {
    const {
      name,
      age,
      gender,
      location,
      identificationMarks = "",
      clothing = "",
      description,
      status = "Sheltered",
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const doc = await Person.create({
      name,
      age: Number(age),
      gender,
      location,
      identificationMarks,
      clothing,
      description,
      status,
      imageUrl,
    });

    res.status(201).json({ ok: true, data: doc });
  } catch (err) {
    next(err);
  }
});

router.delete("/people/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Person.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ ok: false, error: "Record not found" });
    res.json({ ok: true, data: { _id: deleted._id } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

