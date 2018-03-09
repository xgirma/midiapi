var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PodSchema = new Schema({
  title: {type: String, required: true},
  link: {type: String, required: true},
  description: {type: String, required: false},
  image: {type: String, required: false},
  author: {type: String, required: false},
  copyright: {type: String, required: false},
  episodeTitle: {type: String, required: false},
  episodeDescription: {type: String, required: false},
  published: {type: String, required: true},
  url: {type: String, required: true, unique: true},
  mediaType: {type: String, required: false},
  likes: {type: Number, required: false}
})

module.exports = mongoose.model('pod', PodSchema)
