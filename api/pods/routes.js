var router = require('express').Router();
var controller = require('./controller');

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/like').post(controller.like);
router.route('/ten/popular').get(controller.popular);
router.route('/ten/recent').get(controller.recent);

module.exports = router;