const express = require('express')
const app = express()

const Auth = require('./Auth/')
const Drivers = require('./Drivers/')
const Orders = require('./Orders/')
const Invoices = require('./Invoices/')
const Cards = require('./Cards/')

app.use('/auth', Auth)
app.use('/drivers', Drivers)
app.use('/orders', Orders)
app.use('/invoices', Invoices)
app.use('/cards', Cards)

module.exports = app
