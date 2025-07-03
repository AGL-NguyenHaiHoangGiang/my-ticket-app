'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const slugify = require('slugify')

const DOCUMENT_NAME = 'Blog'
const COLLECTION_NAME = 'blogs'
/**
 * Index: isDraft, isPublish
 */

const blogSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogCategory',
    },
    author: {
      type: String,
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
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

// Index for search
blogSchema.index({title: 'text', description: 'text'})


// AutoIncrement ID with unique counter name
blogSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'blog_seq',
})
// Run before save
blogSchema.pre('save', function (next) {
  // Always generate slug if not provided or if title changed
  if (!this.slug || this.isModified('title')) {
    if (this.title) {
      this.slug = slugify(this.title, {
        lower: true,
        strict: true,
      })
    }
  }
  next()
})

module.exports = mongoose.model(DOCUMENT_NAME, blogSchema)
