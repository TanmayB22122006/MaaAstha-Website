const express = require("express");
const router = express.Router();
const { addReport, getReports, deleteReport } = require("../controllers/reportController");

router.post("/", addReport);
router.get("/all", getReports);
router.delete("/delete/:id", deleteReport);

module.exports = router;