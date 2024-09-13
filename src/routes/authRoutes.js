const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import user controller logic

// Route to register a new user
router.post('/register', authController.registerUser);

// Route to log in a user
router.post('/login', authController.loginUser);

module.exports = router;
