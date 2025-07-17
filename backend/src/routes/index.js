'use strict'

const express = require('express')
const router = express.Router()

// Blog
router.use('/api/v1/blogs', require('./blog/public'))
router.use('/api/v1/manager/blogs', require('./blog/manager'))

// Blog Category
router.use('/api/v1/blog-categories', require('./blog-category/public'))
router.use('/api/v1/manager/blog-categories', require('./blog-category/manager'))

module.exports = router