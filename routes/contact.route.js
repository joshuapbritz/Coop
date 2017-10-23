var express = require('express');
var router = express.Router();

// GET route for reading data
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact Us' });
});

router.post('/email', function(req, res, next) {
    var email = {
        title: `Contact request from ${req.body.name}`,
        email: req.body.email,
        timestamp: new Date().toDateString(),
        phone: req.body.phone,
        message: req.body.message,
    };
    res.render('email', { layout: 'account', email: email });
});

module.exports = router;
