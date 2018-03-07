var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PodSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false
	},
	author: {
		type: String,
		required: false
	},
	copyright: {
		type: String,
		required: false
	},
	episode_title: {
		type: String,
		required: false
	},
	episode_description: {
		type: String,
		required: false
	},
	published: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true,
		unique: true
	},
	media_type: {
		type: String,
		required: false
	},
	likes: {
		type: Number,
		required: false
	}
});

module.exports = mongoose.model('pod', PodSchema);