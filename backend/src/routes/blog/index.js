'use strict'

const express = require('express')
const blogController = require('../../controllers/blog.controller')
const asyncHandler = require('../../utils/asyncHandler')
const router = express.Router()

// GET - No permission
router.get('/search/:keySearch', asyncHandler(blogController.getListSearchBlog))
router.get('', asyncHandler(blogController.getAllBlogs))
router.get('/:slug', asyncHandler(blogController.getBlogBySlug))

// Create by manager
router.post('', asyncHandler(blogController.createBlog))
// Update by manager
router.patch('/:id', asyncHandler(blogController.updateBlog))

module.exports = router
