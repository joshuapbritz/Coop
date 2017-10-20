var express = require('express');
var router = express.Router();
var pager = require('../paginater');
var database = require('../database/dbo');
var db = database.connectTo('values');

/*

Basic CRUD api routes

*/

// Routes
router.get('/', function(req, res, next) {
    res.render('api');
});

router.get('/values', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(db.find());
});

router.get('/values/:id', function(req, res, next) {
    var id = Number(req.params.id);
    var data = db.findId(id);
    if (data) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
    } else {
        res.status(404).send('Record not found');
    }
});

router.post('/values', function(req, res) {
    var obj = req.body;
    var data = db.create(obj);
    res.status(200).send(data);
});

router.put('/values/:id', function(req, res) {
    var obj = req.body;
    var id = Number(req.params.id);
    var data = db.update(id, obj);
    if (data) {
        res.status(200).send(obj);
    } else {
        res.status(404).send('Record not found');
    }
});

router.delete('/values/:id', function(req, res) {
    var id = Number(req.params.id);
    var data = db.delete(id);
    if (data) {
        res.status(200).send(data);
    } else {
        res.status(404).send('Record not found');
    }
});

module.exports = router;
