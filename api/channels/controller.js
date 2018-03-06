var Channels = require('./model');
var request = require('request');
var parser = require('node-podcast-parser');

exports.get = function(req, res, next){
	Channels.find({})
		.then( function(channels) {
			res.json(channels);
		}, function(err){
			next(err);
		});
};

exports.post = function(req, res, next){
	var feed = req.query.url;

	var title = undefined;
	var link = undefined;
	var description_short = undefined;
	var description_long = undefined;
	var image = undefined;
	var owner_name = undefined;
	var owner_email = undefined;
	
	request(feed, function (err, resp, data) {
		if (err) {
			console.error(err);
			return;
		}
		parser(data, function (err, data) {
			if (err) {
				console.error(err);
				return;
			}
			
			const temp = data.title;
			title = temp.replace('/', '-');
			link = data.link;
			
			if (data.description.short){ description_short = data.description.short; }
			if (data.description.long){ description_long = data.description.long; }
			if (data.image) { image = data.image; }
			
			if (data.owner) {
				if (data.owner.name) {
					owner_name = data.owner.name;
				}
				if (data.owner.email) {
					owner_email = data.owner.email
				}
			}
			
			if (data.owner) {
				if (data.owner.name) {
					owner_name = data.owner.name;
				}
				if (data.owner.email) {
					owner_email = data.owner.email
				}
			}
			
			var channel = {
				title: title,
				link: link,
				description_short: description_short,
				description_long: description_long,
				image: image,
				owner_name: owner_name,
				owner_email: owner_email
			};
			
			Channels.create(channel)
				.then(function(newChannel){
					res.json(newChannel);
				}, function(err){
					next(err);
				});
		});
	});
};