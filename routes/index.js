const express = require('express')
const app = express()

const Users = require('./Users')
const Drivers = require('./Drivers/')
const Orders = require('./Orders/')
const Invoices = require('./Invoices/')
const Cards = require('./Cards/')

app.use('/users', Users)
app.use('/drivers', Drivers)
app.use('/orders', Orders)
app.use('/invoices', Invoices)
app.use('/cards', Cards)

module.exports = app
