'use strict'

const express = require('express')
const blogController = require('../../controller/blog.controller')
const asyncHandler = require('../../utils/asyncHandler')
const router = express.Router()

// GET - No permission
router.get('/search/:keySearch', asyncHandler(blogController.getListSearchBlog))
router.get('', asyncHandler(blogController.getAllBlogs))

// Create
router.post('', asyncHandler(blogController.createBlog))

// PUT
router.put('/publish/:id', asyncHandler(blogController.publishBlog))
router.put('/unpublish/:id', asyncHandler(blogController.unPublishBlog))

// QUERY
router.get('/drafts/all', asyncHandler(blogController.getAllDrafts))
router.get('/published/all', asyncHandler(blogController.getAllPublish))

module.exports = router
