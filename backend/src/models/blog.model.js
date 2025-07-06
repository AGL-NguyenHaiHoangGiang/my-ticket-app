'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'Blog'
const COLLECTION_NAME = 'Blogs'

const blogSchema = new mongoose.Schema(
  {
    blog_id: {
      type: String,
      unique: true,
    },
    blog_title: {
      type: String,
      required: true,
    },
    blog_slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    blog_image: {
      type: String,
    },
    blog_description: {
      type: String,
    },
    blog_content: {
      type: String,
    },
    blog_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogCategory',
    },
    blog_author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    blog_status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED'],
      default: 'PUBLISHED',
    },
    blog_published_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

// AutoIncrement ID
blogSchema.plugin(AutoIncrement, { inc_field: 'blog_id' })

module.exports = mongoose.model(DOCUMENT_NAME, blogSchema)
