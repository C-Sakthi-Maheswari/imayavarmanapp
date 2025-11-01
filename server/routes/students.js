const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/dashboard', studentController.dashboard);
router.get('/profile/:id', studentController.getProfile);

module.exports = router;
