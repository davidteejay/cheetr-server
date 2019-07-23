const mongoose = require('mongoose')

const user = new mongoose.Schema({
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
	paymentMethod: {
		type: String,
		default: 'cash'
	},
	card: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cards'
	},
	cards: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cards'
	}],
	loginRoute: {
		type: String,
		default: 'normal'
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, {
		timestamps: true
	})

module.exports = mongoose.model('Users', user)
