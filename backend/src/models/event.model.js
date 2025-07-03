'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'Event'
const COLLECTION_NAME = 'events'

const eventSchema = new mongoose.Schema(
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
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventCategory',
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'ACTIVE', 'FINISHED', 'CANCEL'],
      default: 'UPCOMING',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

// Auto-increment with unique counter name
eventSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'event_seq',
})

module.exports = mongoose.model(DOCUMENT_NAME, eventSchema)
