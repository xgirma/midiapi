var router = require('express').Router();

router.use('/channels', require('./channels/routes'));

module.exports = router;
