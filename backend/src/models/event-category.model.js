const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'EventCategory'
const COLLECTION_NAME = 'event_categories'

const eventCategorySchema = new mongoose.Schema(
  {
    event_category_id: {
      type: String,
      unique: true,
    },
    event_category_name: {
      type: String,
      required: true,
      unique: true,
    },
    event_category_description: {
      type: String,
    },
    event_category_status: {
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

eventCategorySchema.plugin(AutoIncrement, { inc_field: 'event_category_id' })

module.exports = mongoose.model(DOCUMENT_NAME, eventCategorySchema)
