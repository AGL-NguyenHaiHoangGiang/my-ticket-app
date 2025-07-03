'use strict'

const blogRepository = require('../models/repositories/blog.repository')
const blogModel = require('../models/blog.model')
const blogCategory = require('../models/blog-category.model')
class BlogService {
  // Create
  static async createBlog(data) {
    return await blogModel.create(data)
  }

  // PUT
  static async publishBlog({id}){
    return await blogRepository.publishBlog({id})
  }
  static async unPublishBlog({id}) {
    return await blogRepository.unPublishBlog({id})    
  }

  // Query
  static async findAllDrafts({ limit = 10, skip = 0 }) {
    const query = { isDraft: true }
    return await blogRepository.findAllDrafts({ query, limit, skip })
  }

  static async findAllPublish({ limit = 10, skip = 0 }) {
    const query = { isPublished: true }
    return await blogRepository.findAllPublish({ query, limit, skip })
  }
}

module.exports = BlogService
