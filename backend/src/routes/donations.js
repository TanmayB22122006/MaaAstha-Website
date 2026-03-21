const express = require("express");

const Donation = require("../models/Donation");

const router = express.Router();

router.get("/donations", async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(500);
    res.json({ ok: true, data: donations });
  } catch (err) {
    next(err);
  }
});

router.post("/donations", async (req, res, next) => {
  try {
    const {
      name,
      phone = "",
      email = "",
      amount,
      paymentMode = "UPI",
      referenceId = "",
      message = "",
    } = req.body || {};

    const amt = Number(amount);
    if (!name || !Number.isFinite(amt) || amt < 1) {
      return res.status(400).json({ ok: false, error: "Invalid name/amount" });
    }

    const doc = await Donation.create({
      name,
      phone,
      email,
      amount: amt,
      paymentMode,
      referenceId,
      message,
    });

    res.status(201).json({ ok: true, data: doc });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

