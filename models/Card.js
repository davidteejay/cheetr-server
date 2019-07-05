const mongoose = require('mongoose')

const { Schema } = mongoose;

const card = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
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
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, {
		timestamps: true,
	})

module.exports = mongoose.model('Cards', card)
