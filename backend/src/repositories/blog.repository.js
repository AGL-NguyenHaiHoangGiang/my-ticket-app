'use strict'

const blogModel = require('../models/blog.model')

class BlogRepository {
  async create(data) {
    return await blogModel.create(data)
  }
}

module.exports = new BlogRepository()
