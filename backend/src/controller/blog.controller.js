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
  // PUT
  publishBlog = async (req, res, next) => {
    new OK({
      message: 'Publish blog success',
      metadata: await blogService.publishBlog({ id: req.params.id }),
    }).send(res)
  }

  unPublishBlog = async (req, res, next) => {
    new OK({
      message: 'UnPublish blog success',
      metadata: await blogService.unPublishBlog({ id: req.params.id }),
    }).send(res)
  }

  // Query
  /**
   * @description Get all draft blog
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON}
   */
  getAllDrafts = async (req, res, next) => {
    new OK({
      message: 'Get list draft success',
      metadata: await blogService.findAllDrafts({}),
    }).send(res)
  }

  getAllPublish = async (req, res, next) => {
    new OK({
      message: 'Get list publish success',
      metadata: await blogService.findAllPublish({}),
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
}

module.exports = new BlogController()
