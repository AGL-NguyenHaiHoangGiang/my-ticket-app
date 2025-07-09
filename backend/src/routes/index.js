'use strict'

const express = require('express')
const router = express.Router()

router.use('/api/v1/blogs', require('./blog'))
router.use('/api/v1/manager/blogs', require('./blog'))

module.exports = router