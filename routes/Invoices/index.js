const express = require('express')
const router = express.Router()
const { mongo } = require('mongoose')

const validateId = require('../../helpers/validateId')
const Invoice = require('../../models/Invoice')

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
	const { id } = req.params

	if (validateId(id)){
		await Invoice.findByIdAndUpdate(id, { ...req.body }, (err, data) => {
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
	} else res.send({
		data: [],
		message: 'Invalid Id',
		error: true
	})
})

module.exports = router
