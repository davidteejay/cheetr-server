const express = require('express')
const router = express.Router()

const validateId = require('../../helpers/validateId')
const Driver = require('../../models/Driver')

router.get('/', async (req, res) => {
	await Driver.find({ isDeleted: false }, { password: 0, cards: 0, loginRoute: 0, isDeleted: 0 }, (err, data) => {
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
		await Driver.findById(id, { password: 0, cards: 0, loginRoute: 0, isDeleted: 0 }, (err, data) => {
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
		await Driver.findByIdAndUpdate(id, { ...req.body }, (err, data) => {
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

	await Driver.findOne({ username, password, isDeleted: false })
		.populate('cards')
		.then(data => {
			if (data !== null) res.send({
				data,
				message: 'Login Successful',
				error: false
			})
			else if (!data.approved) res.send({
				data: [],
				message: 'Not Approved yet',
				error: true
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

	await Driver.find({ username, isDeleted: false }, (err, data) => {
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
			new Driver({ ...req.body })
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
