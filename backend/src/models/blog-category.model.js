'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'BlogCategory'
const COLLECTION_NAME = 'BlogCategories'

const blogCategorySchema = new mongoose.Schema(
  {
    blog_category_id: {
      type: String,
      unique: true,
    },
    blog_category_name: {
      type: String,
      required: true,
    },
    blog_category_description: {
      type: String,
    },
    blog_category_status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)
// AutoIncrement ID
blogCategorySchema.plugin(AutoIncrement, { inc_field: 'blog_category_id' })

module.exports = mongoose.model(DOCUMENT_NAME, blogCategorySchema)
