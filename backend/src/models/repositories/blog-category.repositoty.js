'use strict'

const blogCategoryModel = require('../blog-category.model')

//GET
const findBlogCategoryBySlug = async ({slug}) => {
    return await blogCategoryModel.findOne({slug: slug})    
}

module.exports = {
    findBlogCategoryBySlug,
}