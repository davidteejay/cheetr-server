const mongoose = require('mongoose')

const driver = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: Date,
		required: true
	},
	carrier: {
		type: String,
		required: true
	},
	plateNumber: {
		type: String,
		required: true
	},
	carModel: {
		type: String,
		required: true
	},
	color: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	wallet: {
		type: Number,
		default: 0
	},
	card: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cards'
	},
	approved: {
		type: Boolean,
		default: false
	},
	dateApproved: {
		type: Date
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, {
		timestamps: true
	})

module.exports = mongoose.model('Drivers', driver)
