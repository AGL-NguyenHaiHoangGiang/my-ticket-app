'use strict'

const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Admins'
const COLLECTION_NAME = 'admins'
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    roles: {
      type: Array,
      default: ['MANAGER'],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

module.exports = mongoose.model(DOCUMENT_NAME, adminSchema)
