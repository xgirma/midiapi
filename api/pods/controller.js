var Pods = require('./model');
var pp = require('podchoosee-parser');

/* GET all pods */
exports.get = function (req, res, next) {
  Pods.find({})
    .then(function (pods) {
      res.json(pods);
    }, function (err) {
      next(err);
    });
};

/* GET 10 popular pods of all time and channels */
exports.popular = function (req, res, next) {
  Pods.find()
    .sort({'likes': -1})
    .limit(10)
    .exec(function (err, pods) {
      if(err){
        return next(err)
      }
      res.status(200).json({data: pods})
    });
};

/* GET 10 recent pods of all time and channels */
exports.recent = function (req, res, next) {
  Pods.find()
    .sort({'published': -1})
    .limit(10)
    .exec(function (err, pods) {
      if(err){
        return next(err)
      }
      res.status(200).json({data: pods})
    });
};
/* POST like a pod */
exports.like = function (req, res, next) {
  var podId = req.query.id;
  Pods.update({_id: podId},
    {$inc: {likes: 1}}, function (err, doc) {
      if (err) {
        return next(err);
      }
      res.status(200).json({data: doc});
    });
};

function ifExist(value) {
  if (typeof value !== 'undefined') {
    return value;
  }
}

/* POST pods */
exports.post = function (req, res, next) {
  // channel details
  var feed = req.query.url;
  var title = undefined;
  var link = undefined;
  var description = undefined;
  var image = undefined;
  var author = undefined;
  var copyright = undefined;
  // episode details
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
      if (typeof description === 'undefined' || description === '\n      ') {
        description = ifExist(data.subscription.summary);
        if (typeof description === 'undefined' || description === '\n      ') {
          description = ifExist(data.subscription.subtitle);
        }
      }
      image = ifExist(data.subscription.iTunesImageUrl);
      author = ifExist(data.subscription.author);
      copyright = ifExist(data.subscription.copyright);
      
      for (let i = 0; i < data.episodes.length; i += 1) {
        episode_title = ifExist(data.episodes[i].title);
        episode_description = ifExist(data.episodes[i].description);
        published = ifExist(data.episodes[i].pubDate);
        url = ifExist(data.episodes[i].mediaFileUrl);
        media_type = ifExist(data.episodes[i].mediaType);
        
        var pod = {};
        try {
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
        } catch (err) {
          return console.error(err);
        }
      }
      Pods.insertMany(pods, {ordered: false}, function (err, docs) {
        if (err) {
          next(err);
        } else {
          res.status(200).json({data: docs});
        }
      });
    });
};
