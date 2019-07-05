const express = require('express')
const router = express.Router()
const { mongo } = require('mongoose')

const Card = require('../../models/Card')
const User = require('../../models/User')

router.get('/', (req, res) => {
  Card.find({ ...req.query, isDeleted: false })
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

router.post('/', (req, res) => {
  const { user } = req.body

  new Card({ ...req.body })
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

router.get('/:id', (req, res) => {
  const { id } = req.params

  Card.findById(id)
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
})

router.put('/:id', (req, res) => {
  const { id } = req.params

  Card.findByIdAndUpdate(id, { ...req.body }, (err, data) => {
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
