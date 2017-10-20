var express = require('express');
var router = express.Router();
var auth = require('../auth');

// Signup and Login routes
router.get('/signup', function(req, res) {
    res.render('account/signup', { layout: 'account' });
});

router.post('/signup', function(req, res) {
    var rb = req.body;

    var hashedPassword = auth.hashPassword(rb.password);

    var user = {
        username: rb.username,
        name: rb.name,
        surname: rb.surname,
        email: rb.email,
        password: hashedPassword.passwordHash,
        salt: hashedPassword.salt,
    };

    var createUser = auth.createUser(user);
    if (createUser) {
        res.redirect('/login');
    } else {
        res.status(500).send('Account Already Exsists');
    }
});

router.get('/login', function(req, res) {
    res.render('account/login', { layout: 'account' });
});

router.post('/login', function(req, res) {
    var u = req.body.username;
    var p = req.body.password;

    var loggedIn = auth.login(u, p);
    if (loggedIn) {
        req.session.Uid = loggedIn.password;
        res.redirect('/admin');
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
