'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'UserDetail'
const COLLECTION_NAME = 'user_details'
const userDetailSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    avatar: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    address: {
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
