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
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Transactions', transaction)
