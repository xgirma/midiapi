var express = require('express');
var app = express();
var api = require('./api/api');

require('mongoose').connect(process.env.MIDI_DB);
require('./middleware/middlware');

app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
