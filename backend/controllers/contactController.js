const Contact = require("../models/Contact");

const addContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

module.exports = { addContact, getContacts, deleteContact };