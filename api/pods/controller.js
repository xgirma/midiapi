var Pods = require('./model');
var pp = require('podchoosee-parser');

exports.get = function (req, res, next) {
	Pods.find({})
		.then(function (pods) {
			res.json(pods);
		}, function (err) {
			next(err);
		});
};

function ifExist(value){
	if(typeof value !== 'undefined'){
		return value;
	}
}

exports.post = function (req, res, next) {
	var feed = req.query.url;
	var title = undefined;
	var link = undefined;
	var description = undefined;
	var image = undefined;
	var author = undefined;
	var copyright = undefined;
	
	var episode_title = undefined;
	var episode_description = undefined;
	var published = undefined;
	var url = undefined;
	var media_type = undefined;
	var likes = 0;
	var pods = [];
	
	pp.getSubscriptionPromise(feed, {skip: -1, take: -1, parseSub: true})
		.done(function (data) {
			title = ifExist(data.subscription.title);
			link = ifExist(data.subscription.websiteUrl);
			description = ifExist(data.subscription.description);
			if(typeof description === 'undefined' || description === '\n      '){
				description = ifExist(data.subscription.summary);
				if(typeof description === 'undefined' || description === '\n      '){
					description = ifExist(data.subscription.subtitle);
				}
			}
			image = ifExist(data.subscription.iTunesImageUrl);
			author = ifExist(data.subscription.author);
			copyright = ifExist(data.subscription.copyright);
			
			console.log(data.episodes.length);
			
			for(let i = 0; i < data.episodes.length; i += 1){
				episode_title = ifExist(data.episodes[i].title);
				episode_description = ifExist(data.episodes[i].description);
				published = ifExist(data.episodes[i].pubDate);
				url = ifExist(data.episodes[i].mediaFileUrl);
				media_type = ifExist(data.episodes[i].mediaType);
				
				var pod = {};
				try{
					pod = {
						title,
						link,
						description,
						image,
						author,
						copyright,
						episode_title,
						episode_description,
						published,
						url,
						media_type,
						likes
					};
					pods.push(new Pods(pod));
				} catch(err){
					return console.error(err);
				}
			}
			Pods.insertMany(pods, { ordered: false }, function(err, docs){
				if(err){
					console.error(err);
					res.json(err);
				} else {
					res.json(docs);
				}
			});
		});
};
