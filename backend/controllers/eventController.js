const Event = require("../models/Event");

const addEvent = async (req, res) => {
  try {
    const { title, date, location, description } = req.body;

    if (!title || !date || !location || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const imageUrl = req.file ? req.file.path : "";

    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Event photo is mandatory" });
    }

    const newEvent = await Event.create({
      title,
      date,
      location,
      description,
      imageUrl,
    });

    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

module.exports = { addEvent, getEvents, deleteEvent };
