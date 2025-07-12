'use strict'

const { CREATED, OK } = require('../core/success.response')
const blogCategoryService = require('../services/blog-category.services')

class BlogCategoryController {
  // POST
  createBlogCategory = async (req, res, next) => {
    new CREATED({
      message: 'Create new blog category success',
      metadata: await blogCategoryService.createBlogCategory(req.body)
    }).send(res)
  }

  // GET
  getBlogCategoryBySlug = async (req, res, next) => {
    new OK({
      message: 'Get blog category success',
      metadata: await blogCategoryService.findBlogCategoryBySlug({slug: req.params.slug})
    }).send(res)
  }
}

module.exports = new BlogCategoryController()
