'use strict'

const express = require('express')
const router = express.Router()

// Blog
router.use('/api/v1/blogs', require('./blog'))
router.use('/api/v1/manager/blogs', require('./blog'))

// Blog Category
router.use('/api/v1/blog-categories', require('./blog-category'))
router.use('/api/v1/manager/blog-categories', require('./blog-category'))

module.exports = router