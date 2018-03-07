var Channels = require('./model');
var pp = require('podchoosee-parser');

exports.get = function (req, res, next) {
  Channels.find({})
    .then(function (pods) {
      res.json(pods);
    }, function (err) {
      next(err);
    });
};

function ifExist(value) {
  if (typeof value !== 'undefined') {
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
  
  pp.getSubscriptionPromise(feed, {skip: -1, take: -1, parseSub: true})
    .done(function (data) {
      title = ifExist(data.subscription.title);
      link = ifExist(data.subscription.websiteUrl);
      description = ifExist(data.subscription.description);
      if (typeof description === 'undefined' || description === '\n      ') {
        description = ifExist(data.subscription.summary);
        if (typeof description === 'undefined' || description === '\n      ') {
          description = ifExist(data.subscription.subtitle);
        }
      }
      image = ifExist(data.subscription.iTunesImageUrl);
      author = ifExist(data.subscription.author);
      copyright = ifExist(data.subscription.copyright);
      
      var channel = {
        title,
        link,
        description,
        image,
        author,
        copyright
      };
      
      Channels.create(channel)
        .then(function (newChannel) {
          res.json(newChannel);
        }, function (err) {
          console.log('err', err);
          next(err);
        });
    });
};
