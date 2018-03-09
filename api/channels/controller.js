var Channels = require('./model')
var pp = require('podchoosee-parser')

/* GET all channels detail */
exports.get = function (req, res, next) {
  Channels.find({})
    .then(function (pods) {
      res.json(pods)
    }, function (err) {
      next(err)
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

      var channel = {
        title,
        link,
        description,
        image,
        author,
        copyright
      }

      Channels.create(channel)
        .then(function (newChannel) {
          res.json({data: newChannel})
        }, function (err) {
          next(err)
        })
    })
}
