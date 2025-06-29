'use strict'

const express = require('express')
const blogController = require('../../controller/blog.controller')
const asyncHandler = require('../../utils/asyncHandler')
const router = express.Router()

router.post('', asyncHandler(blogController.createBlog))

module.exports = router