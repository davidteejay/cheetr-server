const mongoose = require('mongoose')

const card = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	cardNumber: {
		type: String,
		required: true
	},
	cvv: {
		type: String,
		required: true
	},
	expiryMonth: {
		type: String,
		required: true
	},
	expiryYear: {
		type: String,
		required: true
	}
}, {
	timestamps: true,
})

module.exports = mongoose.model('Cards', card)
