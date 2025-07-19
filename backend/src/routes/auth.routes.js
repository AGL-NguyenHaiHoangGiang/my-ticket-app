const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /api/v0/signup
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/refresh-token', authController.refreshToken);
router.post('/verify-token', authController.verifyToken);

module.exports = router;
