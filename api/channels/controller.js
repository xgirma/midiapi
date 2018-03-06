var Channels = require('./model');

exports.get = function(req, res, next){
	Channels.find({})
		.then( function(channels) {
			res.json(channels);
		}, function(err){
			next(err);
		});
};