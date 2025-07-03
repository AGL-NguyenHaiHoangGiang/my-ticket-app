'use strict'

const blogModel = require('../blog.model')

// GET
const findAllDrafts = async ({ query, limit, skip }) => {
  return await queryBlog({ query, limit, skip })
}
const findAllPublish = async ({ query, limit, skip }) => {
  return await queryBlog({ query, limit, skip })
}
const findAllBlogs = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 } // Sort by time
  const blogs = await blogModel
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()

  return blogs
}

// Search
const searchBlog = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch)
  const result = await blogModel
    .find(
      {
        isPublished: true,
        $text: { $search: regexSearch },
      },
      { score: { $meta: 'textScore' } },
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean()
  return result
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
  searchBlog,
  findAllBlogs,
}
