const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const Driver = require('../../models/Driver')

router.get('/', (req, res) => {
	Driver
		.find({ ...req.body, isDeleted: false })
		.then(data => {
			res.send({
				data,
				message: 'Drivers Fetched Successfully',
				error: false
			})
		})
		.catch(err => res.send({
			data: [],
			error: true,
			message: err
		}))
})

router.get('/:username', (req, res) => {
	const { username } = req.params

	Driver.findOne({ username, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		if (data === null) res.send({
			data: [],
			message: 'Driver not found',
			error: true
		})
		
		res.send({
			data,
			message: 'Driver Fetched Successfully',
			error: false
		})
	})
})

router.post('/add', (req, res) => {
	const { username } = req.body
	
	User.findOne({ username, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})
		console.log(data)

		if (data === null) res.send({
			data: [],
			message: 'User does not exist',
			error: true
		})
		else {
			new Driver({ ...req.body })
				.save()
				.then(() => res.send({
					data: req.body,
					message: 'Driver added Successfully',
					error: false
				}))
				.catch(error => res.send({
					data: [],
					message: error,
					error: true
				}))
		}
	})
})

router.post('/update/:username', (req, res) => {
	const { username } = req.params

	Driver.updateOne({ username }, { ...req.body }, (err, data) => {
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
