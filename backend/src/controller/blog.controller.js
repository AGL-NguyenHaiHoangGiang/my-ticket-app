'use strict'

const { CREATED } = require("../core/success.response")
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
}

module.exports = new BlogController()
