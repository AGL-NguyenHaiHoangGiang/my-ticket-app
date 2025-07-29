'use strict'

const express = require('express')
const asyncHandler = require('../../utils/asyncHandler')
const authMiddleware = require('../../middlewares/authMiddleware')
const authorizeRoles = require('../../middlewares/authRolesMiddleware')
const userController = require('../../controllers/user.controller')
const router = express.Router()

// Authentication
router.use(authMiddleware) // Verify JWT token
router.use(authorizeRoles(['MANAGER'])) // Check for MANAGER role

//GET list
router.get('', asyncHandler(userController.getAllUsers))


module.exports = router
