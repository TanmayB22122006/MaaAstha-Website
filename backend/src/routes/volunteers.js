const express = require("express");

const Volunteer = require("../models/Volunteer");

const router = express.Router();

router.get("/volunteers", async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 }).limit(500);
    res.json({ ok: true, data: volunteers });
  } catch (err) {
    next(err);
  }
});

router.post("/volunteers", async (req, res, next) => {
  try {
    const { name, phone, helpText } = req.body || {};
    if (!name || !phone || !helpText) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const doc = await Volunteer.create({ name, phone, helpText });
    res.status(201).json({ ok: true, data: doc });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

