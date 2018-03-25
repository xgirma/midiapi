var Pods = require('./model')
var pp = require('podchoosee-parser')

/* GET all pods */
exports.get = function (req, res, next) {
  Pods.find({})
    .then(function (pods) {
      res.json(pods)
    }, function (err) {
      next(err)
    })
}

/* GET 10 popular pods of all times and channels */
exports.popular = function (req, res, next) {
  Pods.find()
    .sort({'likes': -1})
    .limit(10)
    .exec(function (err, pods) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: pods})
    })
}

/* GET 10 recent pods of all times and channels */
exports.recent = function (req, res, next) {
  Pods.find()
    .sort({'published': -1})
    .limit(10)
    .exec(function (err, pods) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: pods})
    })
}

/* GET 10 popular pods of a channels */
exports.channelPopular = function (req, res, next) {
  var channelTitle = req.query.title
  Pods.find({'title': channelTitle})
    .sort({'likes': -1})
    .limit(10)
    .exec(function (err, pods) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: pods})
    })
}

/* GET 10 recent pods of a channels */
exports.channelRecent = function (req, res, next) {
  var channelTitle = req.query.title
  Pods.find({'title': channelTitle})
    .sort({'published': -1})
    .limit(10)
    .exec(function (err, pods) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: pods})
    })
}

/* POST like a pod */
exports.like = function (req, res, next) {
  var podId = req.query.id
  Pods.update({_id: podId},
    {$inc: {likes: 1}}, function (err, doc) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: doc})
    })
}

function ifExist (value) {
  if (typeof value !== 'undefined') {
    return value
  }
}

/* POST pods */
exports.post = function (req, res, next) {
  // channel details
  var feed = req.query.url
  var title, link, description, image, author, copyright
  // episode details
  var episodeTitle, episodeDescription, published, url, mediaType
  var likes = 0
  var pods = []
  var error = []

  pp.getSubscriptionPromise(feed, {skip: -1, take: -1, parseSub: true})
    .done(function (data) {
      title = ifExist(data.subscription.title)
      link = ifExist(data.subscription.websiteUrl)
      description = ifExist(data.subscription.description)
      if (typeof description === 'undefined' || description === '\n      ') {
        description = ifExist(data.subscription.summary)
        if (typeof description === 'undefined' || description === '\n      ') {
          description = ifExist(data.subscription.subtitle)
        }
      }
      image = ifExist(data.subscription.iTunesImageUrl)
      author = ifExist(data.subscription.author)
      copyright = ifExist(data.subscription.copyright)

      for (let i = 0; i < data.episodes.length; i += 1) {
        episodeTitle = ifExist(data.episodes[i].title)
        episodeDescription = ifExist(data.episodes[i].description)
        published = ifExist(data.episodes[i].pubDate)
        url = ifExist(data.episodes[i].mediaFileUrl)
        mediaType = ifExist(data.episodes[i].mediaType)

        var pod = {}
        try {
          pod = {
            title,
            link,
            description,
            image,
            author,
            copyright,
            episodeTitle,
            episodeDescription,
            published,
            url,
            mediaType,
            likes
          }

          var query = { published: published, episodeTitle: episodeTitle }

          Pods.findOneAndUpdate(query, pod, {upsert: true}, function (err, docs) {
            if (err) {
              error.push(err)
            }
            pods.push(new Pods(pod))
          })
        } catch (err) {
          error.push(err)
        }
      }

      if (error.length > 0) {
        res.status(400).json({data: {message: 'Error inserting or updating'}})
      } else {
        res.status(200).json({data: pods})
      }
    })
}

/* GET return the number of channels available */
exports.count = function (req, res, next) {
  Pods.count()
    .exec(function (err, count) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: count})
    })
}
