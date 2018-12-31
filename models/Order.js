const mongoose = require('mongoose')

const order = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	driver: {
		type: String,
	},
	recipientName: {
		type: String,
		required: true
	},
	recipientPhone: {
		type: String,
		required: true
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

module.exports = mongoose.model('Drivers', driver)
