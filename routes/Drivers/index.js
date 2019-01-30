const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const Driver = require('../../models/Driver')

router.get('/', (req, res) => {
	Driver.find({ ...req.body, isDeleted: false }, async (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		let newArr = []
		for (let i = 0; i < data.length; i++){
			const { username } = data[i]

			await User.findOne({ username, isDeleted: false }, (error, datum) => {
				if (error) res.send({
					data: [],
					message: error,
					error: true
				})	
				
				if (datum !== null){
					newArr.push(datum)
				}
			})
		}

		res.send({
			data: {
				driverData: data,
				userData: newArr
			},
			message: 'Drivers Fetched Successfully',
			error: false
		})
	})
})

router.get('/:username', (req, res) => {
	const { username } = req.params

	Driver.findOne({ username, isDeleted: false }, async (err, data) => {
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
		else {
			await User.findOne({ username: data.username, isDeleted: false }, (error, datum) => {
				if (error) res.send({
					data: [],
					message: error,
					error: true
				})

				if (datum === null) res.send({
					data: [],
					message: 'Driver not found',
					error: true
				})
				else {
					res.send({
						data: {
							driverData: data,
							userData: datum
						},
						message: 'Driver Fetched Successfully',
						error: false
					})
				}
			})
		}
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
