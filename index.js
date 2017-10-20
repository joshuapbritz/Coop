var express = require('express');
var exphbs = require('express-handlebars');
var conf = require('./config');
var bodyParser = require('body-parser');
var expsession = require('express-session');
var FileStore = require('session-file-store')(expsession);

// Initialize Express
var app = express();

// Manage CORS
app.use(conf.cors);

// Parse http requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set up the view engine with handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Set up a folder for static assets [eg. CSS, JS, IMAGES, etc]
app.use(express.static('public'));

// Routing
var router = require('./router');
app.use('/', router.home);
app.use('/', router.auth);
app.use('/about', router.about);
app.use('/contact', router.contact);
app.use('/api', router.api);
app.use('/account', router.users);

// Start the server
var port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log('Process started at http://localhost:' + port);
});
