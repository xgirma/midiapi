var router = require('express').Router();

router.use('/channels', require('./channels/routes'));
router.use('/pods', require('./pods/routes'));

module.exports = router;
