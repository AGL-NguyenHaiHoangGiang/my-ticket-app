'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const { default: slugify } = require('slugify')

const DOCUMENT_NAME = 'Blog'
const COLLECTION_NAME = 'Blogs'
/**
 * Index: isDraft, isPublish
 */

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
    isDraft: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
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
// Run before save
blogSchema.pre('save', function (next) {
  if (!this.blog_slug) {
    this.blog_slug = slugify(this.blog_title, { lower: true })
  }

  if (this.isPublished && !this.blog_published_at) {
    this.blog_published_at = new Date()
  }

  next()
})

module.exports = mongoose.model(DOCUMENT_NAME, blogSchema)
