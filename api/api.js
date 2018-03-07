var router = require('express').Router();

router.use('/ping', router.get('/', function(req, res, next){
  res.status(200).send({ data: { message: "pong"}});
}));
router.use('/channels', require('./channels/routes'));
router.use('/pods', require('./pods/routes'));

module.exports = router;
