var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('articles');
var pager = require('../paginater');

// GET route for reading data
router.get('/', function(req, res, next) {
    var data = pager.paginate(db.find(), {
        page: 1,
        recordsPerPage: 1,
        desc: true,
    });
    res.render('news', { title: 'Latest News', data: data });
});

module.exports = router;
