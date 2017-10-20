var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('users');
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

module.exports = router;
