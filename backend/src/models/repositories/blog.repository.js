'use strict'

const blogModel = require('../blog.model')

// GET
const findAllBlogs = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit // Số lượng bản ghi cần bỏ qua
  const sortBy =
    sort === 'ctime' ? { article_datetime: -1 } : { article_datetime: 1 } // Sort by time
  const blogs = await blogModel
    .find(filter)
    .populate('category', 'name -_id')
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()

  return blogs
}
const findBlogBySlug = async ({ slug }) => {
  return await blogModel.findOne({ slug: slug })
}

// Search
const searchBlog = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch)
  const result = await blogModel
    .find(
      {
        $text: { $search: regexSearch },
      },
      { score: { $meta: 'textScore' } },
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean()
  return result
}

module.exports = {
  searchBlog,
  findAllBlogs,
  findBlogBySlug,
}
