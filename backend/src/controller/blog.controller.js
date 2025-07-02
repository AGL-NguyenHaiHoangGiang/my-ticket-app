'use strict'

const { CREATED, OK } = require("../core/success.response")
const blogService = require("../services/blog.service")

class BlogController {
    // Create blog
    createBlog = async (req, res, next)=>{
        new CREATED({
            message: 'Create new blog',
            metadata: await blogService.createBlog({
                ...req.body,
                blog_author: req.user || req.body.blog_author
            }),
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
}

module.exports = new BlogController()
