const express = require('express')
const router = express.Router()

const validateId = require('../../helpers/validateId')
const Driver = require('../../models/Driver')

router.get('/', (req, res) => {
	Driver.find({ isDeleted: false }, { password: 0, cards: 0, loginRoute: 0, isDeleted: 0 }, (err, data) => {
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

router.get('/:id', (req, res) => {
	const { id } = req.params

	if (validateId(id)){
		Driver.findById(id, { password: 0, cards: 0, loginRoute: 0, isDeleted: 0 }, (err, data) => {
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

router.put('/:id', (req, res) => {
	const { id } = req.params

	if (validateId(id)){
		Driver.findByIdAndUpdate(id, { ...req.body }, (err, data) => {
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

router.post('/login', (req, res) => {
	const { username, password } = req.body

	Driver.findOne({ username, password, isDeleted: false })
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

router.post('/signup', (req, res) => {
	const { username } = req.body

	Driver.find({ username, isDeleted: false }, (err, data) => {
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
