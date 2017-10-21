var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('articles');
var pager = require('../paginater');

// GET route for reading data
router.get('/', function(req, res, next) {
    var page = Number(req.query.page);
    var number = 1;
    if (page) {
        number = page;
    }
    var data = pager.paginate(db.find(), {
        page: number,
        recordsPerPage: 20,
        desc: true,
    });

    data.records = data.records.reverse();
    res.render('news', { title: 'Latest News', data: data });
});

router.get('/read/:id', function(req, res, next) {
    var page = Number(req.params.id);
    var article = db.findId(page);

    res.render('view', { title: 'Latest News', data: article });
});

module.exports = router;
