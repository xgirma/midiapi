var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ChannelsSchema = new Schema({
  title: {type: String, required: true, unique: true},
  link: {type: String, required: false},
  description: {type: String, required: false},
  image: {type: String, required: false},
  author: {type: String, required: false},
  copyright: {type: String, required: false},
  feed: {type: String, required: true, unique: true}
})

module.exports = mongoose.model('channel', ChannelsSchema)
