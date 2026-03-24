const MissingPerson = require("../models/MissingPerson");

const addMissingPerson = async (req, res) => {
  try {
    const { name, age, missingSince, location } = req.body;
    
    const count = await MissingPerson.countDocuments();
    if (count >= 6) {
      return res.status(400).json({ success: false, message: "Maximum 6 cases allowed." });
    }

    if (!name || !age || !missingSince || !location) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newPerson = await MissingPerson.create({
      name,
      age,
      missingSince,
      location,
      imageUrl,
    });

    res.status(201).json({ success: true, data: newPerson });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getMissingPersons = async (req, res) => {
  try {
    const persons = await MissingPerson.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json({ success: true, data: persons });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteMissingPerson = async (req, res) => {
  try {
    await MissingPerson.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

module.exports = { addMissingPerson, getMissingPersons, deleteMissingPerson };