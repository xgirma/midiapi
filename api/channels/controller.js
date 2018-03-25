var Channels = require('./model')
var pp = require('podchoosee-parser')

/* GET all channels detail */
exports.get = function (req, res, next) {
  Channels.find({})
    .sort({'title': 1})
    .exec(function (err, channels) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: channels})
    })
}

function ifExist (value) {
  if (typeof value !== 'undefined') {
    return value
  }
}

/* POST a single channel detail */
exports.post = function (req, res, next) {
  var feed = req.query.url
  var title, link, description, image, author, copyright

  pp.getSubscriptionPromise(feed, {skip: -1, take: -1, parseSub: true})
    .then(function (data) {
      if (data !== undefined) {
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

        var channel = {
          title,
          link,
          description,
          image,
          author,
          copyright,
          feed
        }

        Channels.create(channel)
          .then(function (newChannel) {
            res.status(200).json({data: newChannel})
          }, function (err) {
            return next(err)
          })
      } else {
        return next({ message: 'Can Not Parse Feed.'})
      }
    })
    .catch(function (err) {
      return next(err)
    })
}

exports.delete = function (req, res, next) {
  var title = req.query.title
  var query = {title: title}
  Channels.deleteOne(query)
    .exec(function (err, deleted) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: deleted})
    })
}

exports.count = function (req, res, next) {
  Channels.count()
    .exec(function (err, count) {
      if (err) {
        return next(err)
      }
      res.status(200).json({data: count})
    })
}
