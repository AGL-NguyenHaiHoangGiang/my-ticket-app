'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'Booking'
const COLLECTION_NAME = 'bookings'

const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    transactionCode: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    eventId: {
        type: String,
        default: ''
    },
    ticketId: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()),
    },
    deletedAt: {
        type: Date,
        default: null
    },
    tickets: {
        type: Array,
        default: []
    },
  },
  {
    timestamps: false, // Disable automatic timestamps
    collection: COLLECTION_NAME,
  },
)

bookingSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model(DOCUMENT_NAME, bookingSchema)