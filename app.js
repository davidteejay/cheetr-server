const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const { DEVELOPMENT_DB, PRODUCTION_DB } = require('./config/constants')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));;

app.use('/v1', indexRouter);
app.use('/*', (req, res) => res.send({
  data: [],
  message: 'Incorrect Route',
  error: true
}))


mongoose
  .connect(PRODUCTION_DB)
  .then(() => console.log('DB Connected'))
  .catch(() => console.log('DB Offline'))

// error handler
app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on port ${process.env.PORT || 3000}`)
})

module.exports = app;
