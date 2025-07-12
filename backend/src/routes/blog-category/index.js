'use strict'

const express = require('express')
const blogCategoryController = require('../../controllers/blog-category.controller')
const asyncHandler = require('../../utils/asyncHandler')
const router = express.Router()

// GET - No permission
router.get('/:slug', asyncHandler(blogCategoryController.getBlogCategoryBySlug))

// Create by manager
router.post('', asyncHandler(blogCategoryController.createBlogCategory))



module.exports = router
