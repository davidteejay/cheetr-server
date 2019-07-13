const express = require('express')
const router = express.Router()
const { mongo } = require('mongoose')

const validateId = require('../../helpers/validateId')
const Card = require('../../models/Card')
const User = require('../../models/User')

router.get('/', async (req, res) => {
  await Card.find({ ...req.query, isDeleted: false })
    .populate('user', '_id firstName lastName username email phone')
    .then(data => res.send({
      data,
      message: 'Cards fetched successfully',
      error: false
    }))
    .catch(err => res.send({
      data: [],
      message: err,
      error: true
    }))
})

router.post('/', async (req, res) => {
  const { user } = req.body

  await new Card({ ...req.body })
    .save()
    .then(data => {
      User.findById(user, (err, data1) => {
        if (err) res.send({
          data: [],
          message: err,
          error: false
        })

        let cards = data1.cards || []
        cards.push(data._id)

        User.findByIdAndUpdate(user, { cards }, (err, data2) => {
          if (err) res.send({
            data: [],
            message: err,
            error: false
          })

          res.send({
            data,
            message: 'Card added successfully',
            error: false
          })
        })
      })
    })
    .catch(err => res.send({
      data: [],
      message: err,
      error: false
    }))
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (validateId(id)){
    await Card.findById(id)
      .populate('user', '_id firstName lastName username email phone')
      .then(data => {
        if (data === null) res.send({
          data: [],
          message: 'Card not found',
          error: true
        })
        else res.send({
          data,
          message: 'Card retrieved successfully',
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
    await Card.findByIdAndUpdate(id, { ...req.body }, (err, data) => {
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
