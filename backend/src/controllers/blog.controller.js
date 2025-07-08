'use strict'

const { CREATED, OK } = require('../core/success.response')
const blogService = require('../services/blog.service')

class BlogController {
  // POST
  createBlog = async (req, res, next) => {
    new CREATED({
      message: 'Create new blog success',
      metadata: await blogService.createBlog(req.body),
    }).send(res)
  }

  getListSearchBlog = async (req, res, next) => {
    new OK({
      message: 'Get list search blog success',
      metadata: await blogService.getListSearchBlog(req.params),
    }).send(res)
  }

  getAllBlogs = async (req, res, next) => {
    new OK({
      message: 'Get list all blog  success',
      metadata: await blogService.findAllBlogs(req.query),
    }).send(res)
  }

  getBlogBySlug = async (req, res, next) => {
    new OK({
      message: 'Get blog success',
      metadata: await blogService.findBlogBySlug({ slug: req.params.slug }),
    }).send(res)
  }
}

module.exports = new BlogController()
