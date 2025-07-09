'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'Event'
const COLLECTION_NAME = 'ticketbox_events'

const eventSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true, 
    },
    imageUrl: {
      type: String,
      default: "https://images.tkbcdn.com/2/608/332/ts/ds/d7/ca/da/05869cacf8a20ea0871833237856ba07.png", 
    },
    orgLogoUrl: {
      type: String,
      default: "https://images.tkbcdn.com/2/608/332/ts/ds/d7/ca/da/05869cacf8a20ea0871833237856ba07.png", 
    },
    day: {
      type: Date,
      default: new Date(Date.now()).toISOString,
    },
    price: {
      type: mongoose.Schema.Types.Int32,
      default: 0,
    },
    deeplink: {
      type: String,
      default: "https://ticketbox.vn/phat-bao-nghiem-tran-trien-lam-di-san-phat-giao-doc-ban-giua-long-sai-gon-24329?utm_medium=sr-all-dates_all-prices&utm_source=tkb-search-results",
    },
    isNewBookingFlow: {
      type: Boolean,
      default: true,
    },
    originalId: {
      type: Number,
      // Reference to the event's own id
    },
    url: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
    },
    badge: {
      type: String, // Assuming badge can be of any type, adjust as necessary
    },
    categories: {
      type: Array,
      default: ['others'],
    },
  },
  {
    timestamps: false, // Disable automatic timestamps
    collection: COLLECTION_NAME,
  },
)

// Auto-increment
eventSchema.plugin(AutoIncrement, { inc_field: 'id' })

module.exports = mongoose.model(DOCUMENT_NAME, eventSchema)