const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { addEvent, getEvents, deleteEvent } = require("../controllers/eventController");

router.post("/add", upload.single("image"), addEvent);
router.get("/all", getEvents);
router.delete("/delete/:id", deleteEvent);

module.exports = router;