'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'Event'
const COLLECTION_NAME = 'Events'

const eventSchema = new mongoose.Schema(
  {
    event_id: {
      type: String,
      unique: true,
    },
    event_title: {
      type: String,
      required: true,
    },
    event_slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    event_description: {
      type: String,
    },
    event_content: {
      type: String,
    },
    event_image: {
      type: String,
    },
    event_location: {
      type: String,
    },
    event_start_date: {
      type: Date,
    },
    event_end_date: {
      type: Date,
    },
    event_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventCategory',
    },
    event_status: {
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

// Auto-increment
eventSchema.plugin(AutoIncrement, { inc_field: 'event_id' })

module.exports = mongoose.model(DOCUMENT_NAME, eventSchema)
