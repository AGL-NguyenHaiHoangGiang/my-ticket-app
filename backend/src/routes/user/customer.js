'use strict'

const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')
const userController = require('../../controllers/user.controller')
const asyncHandler = require('../../utils/asyncHandler')
const router = express.Router()

// GET user profile
router.get('/profile', authMiddleware, asyncHandler(userController.getUserProfile))

module.exports = router
