const mongoose = require('mongoose')

const invoice = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
	driver: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Drivers'
	},
	date: {
		type: Date,
		required: true,
		default: new Date()
	},
	amount: {
		type: Number,
		required: true
	},
	paymentMethod: {
		type: String,
		default: 'cash'
	},
	billingCard: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cards',
	},
	status: {
		type: String,
		default: 'awaiting approval'
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, {
		timestamps: true
	})

module.exports = mongoose.model('Invoices', invoice)
