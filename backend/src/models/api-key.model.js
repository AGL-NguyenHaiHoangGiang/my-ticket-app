'use strict'

const mongoose = require('mongoose')

const DOCUMENT_NAME = 'ApiKey'
const COLLECTIONS_NAME = 'api_keys'

const apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ['0000', '1111', '2222'],
    },
  },
  {
    timestamps: true,
    collection: COLLECTIONS_NAME,
  },
)

module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema)
