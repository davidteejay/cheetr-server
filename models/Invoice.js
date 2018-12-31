const mongoose = require('mongoose')

const invoice = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	driver: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
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

module.exports = mongoose.model('Invoices', invoice)
