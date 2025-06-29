'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'orders'

const orderSchema = new mongoose.Schema(
  {
    // Internal auto-increment
    order_seq: {
      type: Number,
      unique: true,
    },
    // Public orderID "ORD001"
    order_id: {
      type: String,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order_tickets: [
      {
        ticket_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ticket',
          required: true,
        },
        event_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event',
        },
        ticket_name: {
          type: String,
        },
        ticket_price: {
          type: Number,
        },
        ticket_quantity: {
          type: Number,
        },
      },
    ],
    order_price: {
      type: Number,
    },
    order_status: {
      type: String,
      enum: ['COMPLETE', 'PENDING', 'CANCEL'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

// Auto-increment
orderSchema.plugin(AutoIncrement, { inc_field: 'order_seq' })

// order_id
orderSchema.pre('save', function (next) {
  if (this.isNew && !this.order_id) {
    // ORD001, ORD012, ...
    this.order_id = `ORD${String(this.order_seq).padStart(3, '0')}`
  }
  next()
})

module.exports = mongoose.model(DOCUMENT_NAME, orderSchema)
