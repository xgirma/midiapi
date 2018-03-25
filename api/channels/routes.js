var router = require('express').Router()
var controller = require('./controller')

router.route('/')
  .get(controller.get)
  .post(controller.post)
  .delete(controller.delete)
router.route('/count')
  .get(controller.count)

module.exports = router
