'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'Ticket'
const COLLECTION_NAME = 'tickets'

const ticketSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    ticket_id: {
      type: String,
      unique: true,
    },
    ticket_name: {
      type: String,
      unique: true,
      required: true,
    },
    ticket_min_price: {
      type: Number,
      required: true,
    },
    ticket_max_price: {
      type: Number,
      required: true,
    },
    ticket_quantity: {
      type: Number,
      required: true,
    },
    ticket_status: {
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

// AutoIncrement ID
ticketSchema.plugin(AutoIncrement, { inc_field: 'ticket_id' })

module.exports = mongoose.model(DOCUMENT_NAME, ticketSchema)
