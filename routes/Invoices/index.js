const express = require('express')
const router = express.Router()
const { mongo } = require('mongoose')

const Invoice = require('../../models/Invoice')

router.get('/', (req, res) => {
	Invoice.find({ ...req.body, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Invoices fetched successfully',
			error: false
		})
	})
})

router.get('/driver/:driver', (req, res) => {
	const { driver } = req.params
	Invoice.find({ driver, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Invoices fetched successfully',
			error: false
		})
	})
})

router.get('/:id', (req, res) => {
	const _id = mongo.ObjectID(req.params.id)

	Invoice.findOne({ _id, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

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
})

router.post('/add', (req, res) => {
	new Invoice({ ...req.body })
		.save()
		.then(() => res.send({
			data: req.body,
			message: 'Invoice added successfully',
			error: false
		}))
		.catch(err => res.send({
			data: [],
			message: err,
			error: false
		}))
})

router.post('/update/:id', (req, res) => {
	const _id = mongo.ObjectID(req.params.id)

	Invoice.updateOne({ _id }, (err, data) => {
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
