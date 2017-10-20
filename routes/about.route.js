var express = require('express');
var router = express.Router();

// GET route for reading data
router.get('/', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.get('/test', function(req, res, next) {
    res.send('Test Works');
});

module.exports = router;
