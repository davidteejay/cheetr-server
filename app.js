var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));;

app.use('/v1', indexRouter);
app.use('/*', (req, res) => res.send({
  data: [],
  message: 'Incorrect Route',
  error: true
}))

// error handler
app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on port ${process.env.PORT || 3000}`)
})

module.exports = app;
