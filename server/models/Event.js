const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { createEvent, getEvents } = require("../controllers/eventController");

router.post("/", protect, adminOnly, createEvent);
router.get("/", protect, getEvents);

module.exports = router;
