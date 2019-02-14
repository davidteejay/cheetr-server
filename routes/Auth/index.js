const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const Driver = require('../../models/Driver')

router.post('/login', (req, res) => {
	const { username, password } = req.body

	User.findOne({ username, password, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		if (data !== null) res.send({
			data,
			message: 'Login Successful',
			error: false
		})
		else res.send({
			data: [],
			message: 'Incorrect Username or Password',
			error: true
		})
	})
})

router.post('/driverLogin', (req, res) => {
	const { username, password } = req.body

	Driver.findOne({ username, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		if (data === null) res.send({
			data: [],
			message: 'Incorrect Username or Password',
			error: true
		})
		else {
			User.findOne({ username, password, isDeleted: false }, (err2, data2) => {
				if (err2) res.send({
					data: [],
					message: err2,
					error: true
				})
				//res.send(data)

				if (data2 !== null) res.send({
					data: { data, userData: data2 },
					message: 'Login Successful',
					error: false
				})
				else res.send({
					data: [],
					message: 'Incorrect Username or Password',
					error: true
				})
			})
		}
	})
})

router.post('/signup', (req, res) => {
	const { username } = req.body

	User.find({ username, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		if (data.length > 0) res.send({
			data: [],
			message: 'Username already exists',
			error: true
		})
		else {
			new User({ ...req.body })
				.save()
				.then(() => res.send({
					data: req.body,
					message: 'Signup Successful',
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

router.get('/user/:username', (req, res) => {
	const { username } = req.params

	User.findOne({ username, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		if (data === null) res.send({
			data: [],
			message: 'No data found',
			error: true
		})
		else res.send({
			data,
			message: 'Data retrieved',
			error: false
		})
	})
})

router.post('/update/:username', (req, res) => {
	const { username } = req.params

	User.updateOne({ username }, { ...req.body }, (err, data) => {
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
