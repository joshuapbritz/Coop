var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('events');

// GET route for reading data
router.get('/', function(req, res, next) {
    res.render('events', {
        title: 'Events',
        events: db.find(),
        listings: res.locals.courses,
    });
});

module.exports = router;
