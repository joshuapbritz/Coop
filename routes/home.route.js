var express = require('express');
var router = express.Router();

// GET route for reading data
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Home' });
});

router.get('/icons', function(req, res, next) {
    res.render('components');
});

module.exports = router;
