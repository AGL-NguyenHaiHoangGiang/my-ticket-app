'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DOCUMENT_NAME = 'Transaction'
const COLLECTION_NAME = 'transactions'

const transactionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    transactionCode: {
        type: String,
        unique: true
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

transactionSchema.plugin(AutoIncrement, { inc_field: 'id' });

transactionSchema.pre('save', function(next){
    if (!this.transactionCode && this.id != null) {
        this.transactionCode = `MTP${String(this.id).padStart(6, '0')}`;
    }
    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, transactionSchema)