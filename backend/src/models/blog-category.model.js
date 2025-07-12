'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const slugify = require('slugify')

const DOCUMENT_NAME = 'BlogCategory'
const COLLECTION_NAME = 'blog_categories'

const blogCategorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    slug: {
      type: String,
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

//  update (query)
blogCategorySchema.pre(
  ['findOneAndUpdate', 'updateOne', 'findByIdAndUpdate'],
  function (next) {
    const update = this.getUpdate()
    if (update.name) {
      update.slug = slugify(update.name, { lower: true, strict: true })
    }
    next()
  },
)

// Run before save
blogCategorySchema.pre('save', function (next) {
  // Auto generate slug if not
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true })
  }
  next()
})

module.exports = mongoose.model(DOCUMENT_NAME, blogCategorySchema)
