const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { addMissingPerson, getMissingPersons, deleteMissingPerson } = require("../controllers/missingPersonController");

router.post("/add", upload.single("image"), addMissingPerson);
router.get("/all", getMissingPersons);
router.delete("/delete/:id", deleteMissingPerson);

module.exports = router;