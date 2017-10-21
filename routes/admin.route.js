var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('users');
var articles = database.connectTo('articles');
var fs = require('fs');
var auth = require('../auth');

/*

Basic CRUD api routes

*/

// Routes
router.get('/', function(req, res, next) {
    if (auth.authorize(req.session.Uid)) {
        var user = db.findOne(e => e.password === req.session.Uid);
        res.render('admin/home', {
            layout: 'admin',
            title: 'Admin Home',
            user: user,
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/news', function(req, res) {
    if (auth.authorize(req.session.Uid)) {
        var user = db.findOne(e => e.password === req.session.Uid);
        var article = {
            title: req.body.title,
            author: req.body.author,
            body: format(req.body.body),
        };
        var path = '/news_images/news_image_' + Date.now() + '.jpeg';
        var file = req.files.upload;
        if (!file) {
            res.status(400).send('No Image Found');
        }
        file.mv('C:\\projects\\Coop\\public' + path, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                article.path = path;
                var done = articles.create(article);
                if (done) {
                    res.redirect('/news');
                } else {
                    res.status(500).send('There was an error');
                }
            }
        });
    } else {
        res.redirect('/login');
    }
});

function format(para) {
    return para.replace(/(.+)/gi, '<p>$1</p>');
}

module.exports = router;
