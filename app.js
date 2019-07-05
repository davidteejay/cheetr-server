const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/');
const { PRODUCTION_DB, DEVELOPMENT_DB } = require('./config/constants')

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));;

app.use('/api/v1', indexRouter);
app.use('/*', (req, res) => res.send({
  data: [],
  message: 'Incorrect Route',
  error: true
}))


mongoose
  .connect(isProduction ? PRODUCTION_DB : DEVELOPMENT_DB)
  .then(() => console.log('DB Connected'))
  .catch(() => console.log('DB Offline'))

// error handler
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

module.exports = app;
