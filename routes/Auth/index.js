const express = require('express')
const router = express.Router()

const User = require('../../models/User')

router.post('/login', (req, res) => {
	const { username, password } = req.body

	User.findOne({ username, password, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		if (!data.username) res.send({
			data: [],
			message: 'Incorrect Username or Password',
			error: true
		})
		else res.send({
			data,
			message: 'Login Successful',
			error: false
		})
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

		if (!data.username) res.send({
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
