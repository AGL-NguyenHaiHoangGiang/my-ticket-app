'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'UserDetail'
const COLLECTION_NAME = 'UserDetails'
const userDetailSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    user_avatar: {
      type: String,
      default: null,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_dob: {
      type: Date,
      default: null,
    },
    user_phone: {
      type: String,
      default: null,
    },
    user_address: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

module.exports = mongoose.model(DOCUMENT_NAME, userDetailSchema)
