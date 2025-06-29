'use strict'

const BlogRepository  = require("../repositories/blog.repository")

class BlogService {
  // Create
  async createBlog(data) {
    return await BlogRepository.create(data)
  }
}

module.exports = new BlogService()
