'use strict'

const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')
const userController = require('../../controllers/user.controller')
const asyncHandler = require('../../utils/asyncHandler')
const router = express.Router()

// GET user by ID, Owner or Manager
router.get('/:id', 
  authMiddleware,
  asyncHandler(userController.getUserById)
)

module.exports = router
