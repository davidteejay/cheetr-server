const express = require('express')
const router = express.Router()
const { mongo } = require('mongoose')

const validateId = require('../../helpers/validateId')
const Invoice = require('../../models/Invoice')
const Transaction = require('../../models/Transaction')
const Driver = require('../../models/Driver')

router.get('/', async (req, res) => {
	await Invoice.find({ ...req.query, isDeleted: false })
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

router.post('/', async (req, res) => {
	await new Invoice({ ...req.body })
		.save()
		.then(data => res.send({
			data,
			message: 'Invoice added successfully',
			error: false
		}))
		.catch(err => res.send({
			data: [],
			message: err,
			error: false
		}))
})

router.get('/:id', async (req, res) => {
	const { id } = req.params

	if (validateId(id)){
		await Invoice.findById(id)
			.populate('user', '_id firstName lastName username email phone')
			.populate('driver', '_id firstName lastName username phone carrier')
			.then(data => {
				if (data === null) res.send({
					data: [],
					message: 'Invoice not found',
					error: true
				})
				else res.send({
					data,
					message: 'Invoice retrieved successfully',
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
			await Invoice.findByIdAndUpdate(id, { ...req.body }, async (err, data) => {
				if (err) throw err

				if (status === 'approved') {
					await new Transaction({
						user: data.user,
						driver: data.driver,
						orderId: id,
						type: 'credit',
						amount: data.amount
					})
						.save()
						.then(async () => {
							await Driver.findById(data.driver, async (err, driver) => {
								if (err) throw err

								let { wallet } = driver
								let { amount } = data

								await Driver.findByIdAndUpdate(data.driver, { wallet: data.paymentMethod === 'cash' ? wallet - (amount * 0.1) : wallet + (amount * 0.9) }, (err, updated) => {
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
