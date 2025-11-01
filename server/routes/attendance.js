const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');

router.use(protect);

router.post('/', markAttendance);
router.get('/', getAttendance);

module.exports = router;
