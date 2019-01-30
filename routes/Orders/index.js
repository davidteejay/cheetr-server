const express = require('express')
const router = express.Router()
const { mongo } = require('mongoose')

const Order = require('../../models/Order')

router.get('/', (req, res) => {
	Order.find({ ...req.body, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Orders Retrieved Successfully',
			error: false
		})
	})
})

router.get('/:id', (req, res) => {
	const _id = mongo.ObjectId(req.params.id)

	Order.findOne({ _id, isDeleted: false }, (err, data) => {
		if(err) res.send({
			data: [],
			message: err,
			error: true
		})

		if (data === null) res.send({
			data: [],
			message: 'Order Not Found',
			error: true
		})
		else res.send({
			data,
			message: 'Order Retrieved Successfully',
			error: false
		})
	})
})

router.post('/update/:id', (req, res) => {
	const _id = mongo.ObjectId(req.params.id)

	Order.updateOne({ _id }, { ...req.body }, (err, data) => {
		if(err) res.send({
			data: [],
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Order Updated Successfully',
			error: false
		})
	})
})

router.post('/add', (req, res) => {
	new Order({ ...req.body })
		.save()
		.then(() => res.send({
			data: req.body,
			message: 'Order Added Successully',
			error: false
		}))
		.catch(err => res.send({
			data: [],
			message: err,
			error: true
		}))
})

module.exports = router
