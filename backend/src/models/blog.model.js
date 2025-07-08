'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const slugify = require('slugify')

const DOCUMENT_NAME = 'Blog'
const COLLECTION_NAME = 'article_details'
/**
 * Index: isDraft, isPublish
 */

const blogSchema = new mongoose.Schema(
  {
    article_id: {
      type: Number,
      unique: true,
    },
    article_friendly_time: {
      type: String,
    },
    article_datetime: {
      type: Date,
    },
    published_date: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
    },
    thumpnail: {
      type: String,
    },
    author: {
      type: String,
    },
    summary: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: [String],
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogCategory',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

// Index for search
blogSchema.index({ title: 'text', short_description: 'text', summary: 'text' })

// AutoIncrement ID with unique counter name
blogSchema.plugin(AutoIncrement, {
  inc_field: 'article_id',
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
