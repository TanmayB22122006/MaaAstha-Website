const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { addMissingPerson, getMissingPersons, deleteMissingPerson } = require("../controllers/missingPersonController");

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post("/add", upload.single("image"), addMissingPerson);
router.get("/all", getMissingPersons);
router.delete("/delete/:id", deleteMissingPerson);

module.exports = router;