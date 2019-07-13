const express = require('express')
const router = express.Router()

const validateId = require('../../helpers/validateId')
const User = require('../../models/User')

router.get('/', async (req, res) => {
	await User.find({ isDeleted: false }, { password: 0, cards: 0, loginRoute: 0, isDeleted: 0 }, (err, data) => {
		if (err) res.send({
			data: [],
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Data retrieved',
			error: false
		})
	})
})

router.get('/:id', async (req, res) => {
	const { id } = req.params

	if (validateId(id)){
		await User.findById(id, { password: 0, cards: 0, loginRoute: 0, isDeleted: 0 }, (err, data) => {
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
	} else res.send({
		data: [],
		message: 'Invalid Id',
		error: true
	})
})

router.put('/:id', async (req, res) => {
	const { id } = req.params

	if (validateId(id)){
		await User.findByIdAndUpdate(id, { ...req.body }, (err, data) => {
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

router.post('/login', async (req, res) => {
	const { username, password } = req.body

	await User.findOne({ username, password, isDeleted: false })
		.populate('cards')
		.then(data => {
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
		.catch(err => res.send({
			data: [],
			message: err,
			error: true
		}))
})

router.post('/signup', async (req, res) => {
	const { username } = req.body

	await User.find({ username, isDeleted: false }, (err, data) => {
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
				.then(data => res.send({
					data,
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

module.exports = router
