const express = require("express");
const router = express.Router();
const { addContact, getContacts, deleteContact } = require("../controllers/contactController");

router.post("/", addContact);
router.get("/all", getContacts);
router.delete("/delete/:id", deleteContact);

module.exports = router;