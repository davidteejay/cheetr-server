const express = require('express')
const router = express.Router()
const { mongo } = require('mongoose')

const Order = require('../../models/Order')

router.get('/', (req, res) => {
	Order.find({ ...req.query, isDeleted: false })
		.populate('user', '_id firstName lastName username email phone')
		.populate('driver', '_id firstName lastName username phone carrier')
		.then(data => res.send({
			data,
			message: 'Invoices fetched successfully',
			error: false
		}))
		.catch(err => res.send({
			data: [],
			message: err,
			error: true
		}))
})

router.post('/', (req, res) => {
	new Order({ ...req.body })
		.save()
		.then(data => res.send({
			data,
			message: 'Order added successfully',
			error: false
		}))
		.catch(err => res.send({
			data: [],
			message: err,
			error: false
		}))
})

router.get('/:id', (req, res) => {
	const { id } = req.params

	Order.findById(id)
		.populate('user', '_id firstName lastName username email phone')
		.populate('driver', '_id firstName lastName username phone carrier')
		.then(data => {
			if (data === null) res.send({
				data: [],
				message: 'Order not found',
				error: true
			})
			else res.send({
				data,
				message: 'Order retrieved successfully',
				error: false
			})
		})
		.catch(err => res.send({
			data: [],
			message: err,
			error: true
		}))
})

router.put('/:id', (req, res) => {
	const { id } = req.params

	Order.findByIdAndUpdate(id, { ...req.body }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Updated Successfully',
			error: false
		})
	})
})

module.exports = router
