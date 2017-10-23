var express = require('express');
var router = express.Router();

// GET route for reading data
router.get('/', function(req, res, next) {
    res.render('teachers', { title: 'Meet the Teachers', listings: res.locals.courses });
});

module.exports = router;