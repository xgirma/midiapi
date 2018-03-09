var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ChannelsSchema = new Schema({
  title: {type: String, required: true, unique: true},
  link: {type: String, required: true, unique: true},
  description: {type: String, required: false},
  image: {type: String, required: false},
  author: {type: String, required: false},
  copyright: {type: String, required: false}
})

module.exports = mongoose.model('channel', ChannelsSchema)
