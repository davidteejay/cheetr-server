const mongoose = require('mongoose')

const transaction = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drivers',
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders'
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoices'
  },
  type: {
    type: String,
    required: true
  },
  trxnRef: {
    type: String,
    default: Math.floor((Math.random() * 1000000000) + 1).toString()
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Transactions', transaction)
