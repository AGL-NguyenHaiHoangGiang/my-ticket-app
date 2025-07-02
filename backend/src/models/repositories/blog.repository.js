'use strict'

const blogModel = require('../blog.model')

const findAllDrafts = async ({ query, limit, skip }) => {
  return await queryBlog({ query, limit, skip })
}
const findAllPublish = async ({ query, limit, skip }) => {
  return await queryBlog({ query, limit, skip })
}

const queryBlog = async ({ query, limit, skip }) => {
  return await blogModel
    .find(query)
    .populate('blog_category', 'blog_category_name -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

module.exports = {
  findAllDrafts,
  findAllPublish,
}
