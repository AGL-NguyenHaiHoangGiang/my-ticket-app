'use strict'

const express = require('express')
const blogCategoryController = require('../../controllers/blog-category.controller')
const asyncHandler = require('../../utils/asyncHandler')
const router = express.Router()

// GET - No permission
router.get('/:slug', asyncHandler(blogCategoryController.getBlogCategoryBySlug))
router.get('',asyncHandler(blogCategoryController.getAllBlogCategories))
// Create by manager
router.post('', asyncHandler(blogCategoryController.createBlogCategory))
// Update by manager
router.patch('/:id', asyncHandler(blogCategoryController.updateBlogCategory))
// Delete by manager
router.delete('/:id', asyncHandler(blogCategoryController.deleteBlogCategory))



module.exports = router
