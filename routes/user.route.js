var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('values');
var fs = require('fs');

/*

Basic CRUD api routes

*/

// Routes
router.get('/', function(req, res, next) {
    res.send((__dirname + '\\api.route.js').bold().strike());
});

module.exports = router;
