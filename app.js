var express = require('express')
var Boom = require('boom')
var app = express()
var api = require('./api/api')

require('mongoose').connect(process.env.MIDI_DB)
require('./middleware/middlware')

app.use('/api/v1', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = Boom.notFound('Page Not Found')
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.output ? err.output.payload : err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500).json({
    message: res.locals.message,
    error: res.locals.error
  })
})

module.exports = app
