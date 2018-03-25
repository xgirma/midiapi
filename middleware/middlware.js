var morgan = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')
var override = require('method-override')
var winston = require('winston')
var winstonExpress = require('express-winston')
require('winston-mongodb')

module.exports = function (app) {
  app.use(cors())
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(override())
  app.use(winstonExpress.logger({
    transports: [
      new winston.transports.MongoDB({
        db: process.env.MIDI_DB,
        collection: 'log',
        storeHost: true,
      })
    ],
    meta: true,
    msg: 'HTTP: {{req.method}} {{req.url}} | STATUS: {{res.statusCode}} | TIME: {{res.responseTime}}ms'
  }))
}
