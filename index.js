var express = require('express');
var exphbs = require('express-handlebars');
var conf = require('./config');
var bodyParser = require('body-parser');
var expsession = require('express-session');
var FileStore = require('session-file-store')(expsession);
var fileupload = require('express-fileupload');
var db = require('./database/dbo');
var courses = db.connectTo('courses');

// Initialize Express
var app = express();

// Manage CORS
app.use(conf.cors);

// Allow the upload of images
app.use(fileupload());

// Add a list of courses to all routes for the dropdown menu
app.use(function(req, res, next) {
    var coursesListings = courses.find();
    coursesListings.sort((a, b) => b.subCourses.length - a.subCourses.length);
    // Perform Transforms on the Course dropdown here
    res.locals.courses = coursesListings.slice(0, 4);
    next();
});

// Setup session storage
app.use(
    expsession({
        secret: 'Ice Cream Is Happiness',
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1800000 },
        store: new FileStore(),
    })
);

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
app.use('/news', router.news);
app.use('/admin', router.admin);
app.use('/resources', router.resources);
app.use('/teachers', router.teachers);
app.use('/courses', router.courses);
app.use('/events', router.events);

// Start the server
var port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log('Process started at http://localhost:' + port);
});
