const mongoose = require('mongoose')

const order = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Drivers'
	},
	recipientName: {
		type: String,
		required: true
	},
	recipientPhone: {
		type: String,
		required: true
	},
	price: {
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
	pickup: {
		type: Object,
		required: true
	},
	dropoff: {
		type: Object,
		required: true
	},
	carrier: {
		type: String,
		default: false
	},
	package: {
		type: String,
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

module.exports = mongoose.model('Orders', order)
