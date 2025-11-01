const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.dashboard);
router.get('/students', adminController.getAllStudents);
router.post('/students', adminController.addStudent);
router.delete('/students/:id', adminController.deleteStudent);
router.get('/events', adminController.getAllEvents);
router.post('/events', adminController.addEvent);

module.exports = router;
