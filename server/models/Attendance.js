const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { markAttendance, getAttendance } = require("../controllers/attendanceController");

router.post("/", protect, adminOnly, markAttendance);
router.get("/", protect, getAttendance);

module.exports = router;
