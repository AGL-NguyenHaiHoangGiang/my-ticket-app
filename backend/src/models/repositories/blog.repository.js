'use strict'

const blogModel = require('../blog.model')

// GET
const findAllDrafts = async ({ query, limit, skip }) => {
  return await queryBlog({ query, limit, skip })
}
const findAllPublish = async ({ query, limit, skip }) => {
  return await queryBlog({ query, limit, skip })
}
//PUT
const publishBlog = async ({ id }) => {
  const { modifiedCount } = await blogModel.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        isDraft: false,
        isPublished: true,
        publishedAt: new Date(),
      },
    },
  )

  return modifiedCount
}
const unPublishBlog = async ({ id }) => {
  const { modifiedCount } = await blogModel.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        isDraft: true,
        isPublished: false,
        publishedAt: null,
      },
    },
  )

  return modifiedCount
}
// QUERY
const queryBlog = async ({ query, limit, skip }) => {
  return await blogModel
    .find(query)
    .populate('category', 'name -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

module.exports = {
  findAllDrafts,
  findAllPublish,
  publishBlog,
  unPublishBlog,
}
