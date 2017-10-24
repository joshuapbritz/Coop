var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('articles');

// GET route for reading data
router.get('/', function(req, res, next) {
    var news = db
        .find()
        .reverse()
        .slice(0, 2);
    res.render('home', {
        title: 'Home',
        articles: news,
        listings: res.locals.courses,
    });
});

router.get('/icons', function(req, res, next) {
    res.render('components', { listings: res.locals.courses });
});

module.exports = router;
