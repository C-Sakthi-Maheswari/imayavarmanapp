const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getAllStudents } = require("../controllers/studentController");

router.get("/", protect, adminOnly, getAllStudents);

module.exports = router;
