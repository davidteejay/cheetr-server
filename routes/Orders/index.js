const express = require('express')
const router = express.Router()
const { mongo } = require('mongoose')

const validateId = require('../../helpers/validateId')
const Order = require('../../models/Order')
const Transaction = require('../../models/Transaction')
const Driver = require('../../models/Driver')

router.get('/', async (req, res) => {
	await Order.find({ ...req.query, isDeleted: false })
		.populate('user', '_id firstName lastName username email phone')
		.populate('driver', '_id firstName lastName username phone carrier')
		.then(data => res.send({
			data,
			message: 'Orders fetched successfully',
			error: false
		}))
		.catch(err => res.send({
			data: [],
			message: err,
			error: true
		}))
})

router.post('/', async (req, res) => {
	await new Order({ ...req.body })
		.save()
		.then(data => res.send({
			data,
			message: 'Order added successfully',
			error: false
		}))
		.catch(err => res.send({
			data: [],
			message: err,
			error: true
		}))
})

router.get('/:id', async (req, res) => {
	const { id } = req.params

	if (validateId(id)){
		await Order.findById(id)
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
	} else res.send({
		data: [],
		message: 'Invalid Id',
		error: true
	})
})

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { status } = req.body

		if (validateId(id)){
			await Order.findByIdAndUpdate(id, { ...req.body }, async (err, data) => {
				if (err) throw err

				if (status === 'awaiting delivery'){
					await new Transaction({
						user: data.user,
						driver: data.driver,
						orderId: id,
						type: 'credit',
						amount: data.price
					})
					.save()
					.then(async () => {
						await Driver.findById(data.driver, (err, driver) => {
							if (err) throw err

							let { wallet } = driver
							let { price } = data

							Driver.findByIdAndUpdate(data.driver, { wallet: data.paymentMethod === 'cash' ? wallet - (amount * 0.1) : wallet + (amount * 0.9) }, (err, updated) => {
								if (err) throw err

								res.send({
									data,
									message: 'Updated Successfully',
									error: false
								})
							})
						})
					})
					.catch(err => {
						throw err
					})
				} else res.send({
					data,
					message: 'Updated Successfully',
					error: false
				})
			})
		} else res.send({
			data: [],
			message: 'Invalid Id',
			error: true
		})
	} catch (err) {
		res.send({
			data: [],
			message: err,
			error: true
		})
	}
})

module.exports = router
