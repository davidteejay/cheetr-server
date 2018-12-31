const express = require('express')
const app = express()

const Auth = require('./Auth/')

app.use('/auth', Auth)

module.exports = app
