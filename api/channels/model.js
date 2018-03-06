var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChannelsSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	link: {
		type: String,
		required: true,
		unique: true
	},
	description_short: {
		type: String,
		required: false
	},
	description_long: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false
	},
	owner_name: {
		type: String,
		required: false
	},
	owner_email: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('channel', ChannelsSchema);