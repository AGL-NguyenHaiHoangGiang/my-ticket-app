'use strict'

const blogCategoryModel = require('../models/blog-category.model')
const { BadRequestError } = require('../core/error.response')
const {
  findBlogCategoryBySlug,
} = require('../models/repositories/blog-category.repositoty')

class BlogCategoryService {
  // Create
  static async createBlogCategory(payload) {
    return await blogCategoryModel.create(payload)
  }

  // Query
  static async findBlogCategoryBySlug({slug}) {
    return await findBlogCategoryBySlug({slug})
  }
}

module.exports = BlogCategoryService
