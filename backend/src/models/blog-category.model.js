'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'BlogCategory'
const COLLECTION_NAME = 'blog_categories'

const blogCategorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
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
// AutoIncrement ID with unique counter name
blogCategorySchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'blog_category_seq',
})

module.exports = mongoose.model(DOCUMENT_NAME, blogCategorySchema)
