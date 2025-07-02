const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /api/v0/signup
router.post('/signup', authController.signup);

module.exports = router;
