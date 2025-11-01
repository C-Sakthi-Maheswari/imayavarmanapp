const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.use(protect);

router.get('/', getEvents);
router.post('/', addEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
