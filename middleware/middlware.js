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
  // TODO enable this at the end
  // app.use(winstonExpress.logger({
  //   transport: [
  //     new winston.transports.MongoDB({
  //       db: '',
  //       collection: '',
  //       host: '',
  //       username: '',
  //       password: ''
  //     })
  //   ],
  //   meta: false,
  //   msg: 'HTTP: {{req.method}} {{req.url}} | STATUS: {{res.statusCode}} | TIME: {{res.responseTime}}ms'
  // }))
}
