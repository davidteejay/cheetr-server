const express = require('express')
const app = express()

const Auth = require('./Auth/')

// app.use('/auth', Auth)

app.use('/*', (req, res) => res.send({
  data: [],
  message: 'Incorrect Route',
  error: true
}))

module.exports = app
