var router = require('express').Router()
var controller = require('./controller')

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/like').put(controller.like)
router.route('/ten/popular').get(controller.popular)
router.route('/ten/recent').get(controller.recent)
router.route('/ten/popular/channel').get(controller.channelPopular)
router.route('/ten/recent/channel').get(controller.channelRecent)

module.exports = router
