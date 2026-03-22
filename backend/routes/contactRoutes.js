const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// Route to save contact form data
router.post("/", async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.json({ success: true, message: "Message saved" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to get all messages for admin panel
router.get("/all", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;