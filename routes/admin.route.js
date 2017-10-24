var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('users');
var articles = database.connectTo('articles');
var courses = database.connectTo('courses');
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

router.get('/news', function(req, res, next) {
    if (auth.authorize(req.session.Uid)) {
        var user = db.findOne(e => e.password === req.session.Uid);
        var news = articles.find().reverse();
        res.render('admin/articles/news', {
            layout: 'admin',
            title: 'Admin News',
            user: user,
            articles: news,
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/news/create', function(req, res, next) {
    if (auth.authorize(req.session.Uid)) {
        var user = db.findOne(e => e.password === req.session.Uid);
        res.render('admin/articles/create', {
            layout: 'admin',
            title: 'Admin News',
            user: user,
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/news/edit/:id', function(req, res, next) {
    if (auth.authorize(req.session.Uid)) {
        var id = Number(req.params.id);
        var user = db.findOne(e => e.password === req.session.Uid);
        var article = articles.findId(id);
        article.body = article.body.replace(/<p>/gi, '');
        article.body = article.body.replace(/<\/p>/gi, '');
        res.render('admin/articles/create', {
            layout: 'admin',
            title: 'Admin News',
            user: user,
            article: article,
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/news/edit/:id', function(req, res, next) {
    if (auth.authorize(req.session.Uid)) {
        var id = Number(req.params.id);
        var user = db.findOne(e => e.password === req.session.Uid);
        var article = articles.findId(id);
        article.title = req.body.title;
        article.body = format(req.body.body);
        article.snippet = snippet(req.body.body);
        article.published = new Date().toDateString();
        var saved = articles.update(id, article);
        if (saved) {
            res.redirect('/admin/news');
        } else {
            res.status(500).send('There was an error');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/news/delete/:id', function(req, res, next) {
    if (auth.authorize(req.session.Uid)) {
        var id = Number(req.params.id);
        var deleted = articles.delete(id);
        if (deleted) {
            res.redirect('/admin/news');
        } else {
            res.status(500).send('There was an error');
        }
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
            published: new Date().toDateString(),
            snippet: snippet(req.body.body),
            body: format(req.body.body),
        };
        var path = '/news_images/news_image_' + Date.now() + '.jpeg';
        var file = req.files.upload;
        if (!file) {
            res.status(400).send('No Image Found');
        }
        file.mv(__dirname.replace('routes', 'public') + path, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(__dirname);
                article.path = path;
                var done = articles.create(article);
                if (done) {
                    res.redirect('/admin/news');
                } else {
                    res.status(500).send('There was an error');
                }
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/courses', function(req, res, next) {
    if (auth.authorize(req.session.Uid)) {
        var user = db.findOne(e => e.password === req.session.Uid);
        var course = courses.find();
        res.render('admin/courses/courses', {
            layout: 'admin',
            title: 'Admin Courses',
            courses: course,
            user: user,
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/courses/create', function(req, res, next) {
    if (auth.authorize(req.session.Uid)) {
        var user = db.findOne(e => e.password === req.session.Uid);
        res.render('admin/courses/create_course', {
            layout: 'admin',
            title: 'Admin Courses',
            user: user,
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/courses/course/:id', function(req, res, next) {
    var id = Number(req.params.id);
    if (auth.authorize(req.session.Uid)) {
        var user = db.findOne(e => e.password === req.session.Uid);
        var course = courses.findId(id);
        res.render('admin/courses/view_course', {
            layout: 'admin',
            title: 'Admin Courses',
            course: course,
            user: user,
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/courses/course/:id/add', function(req, res, next) {
    var id = Number(req.params.id);
    if (auth.authorize(req.session.Uid)) {
        var user = db.findOne(e => e.password === req.session.Uid);
        var course = courses.findId(id);
        res.render('admin/courses/view_add_course', {
            layout: 'admin',
            title: 'Admin Courses',
            course: course,
            user: user,
        });
    } else {
        res.redirect('/login');
    }
});

// Create a course
router.post('/courses', function(req, res) {
    if (auth.authorize(req.session.Uid)) {
        var course = {
            name: req.body.name,
            gradeFrom: req.body.from_grade,
            gradeTo: req.body.to_grade,
            subCourses: [],
        };
        var created = courses.create(course);
        if (created) {
            res.redirect('/admin/courses');
        } else {
            res.status(500).send('There was an error');
        }
    } else {
        res.redirect('/login');
    }
});

router.post('/courses/:id/add', function(req, res) {
    var id = Number(req.params.id);
    if (auth.authorize(req.session.Uid)) {
        var course = courses.findId(id);

        var subcourse = {
            id: Date.now(),
            name: req.body.name,
            description: format(req.body.description),
            link: req.body.link,
        };

        course.subCourses.push(subcourse);
        courses.update(id, course);

        res.redirect('/admin/courses');
    } else {
        res.redirect('/login');
    }
});

router.get('/courses/delete/:id', function(req, res) {
    var id = Number(req.params.id);
    if (auth.authorize(req.session.Uid)) {
        courses.delete(id);

        res.redirect('/admin/courses');
    } else {
        res.redirect('/login');
    }
});

router.get('/courses/delete/:id/:courseid', function(req, res) {
    var id = Number(req.params.id);
    var cid = Number(req.params.courseid);
    if (auth.authorize(req.session.Uid)) {
        var course = courses.findId(id);

        var i = course.subCourses.findIndex(c => c.id === cid);

        course.subCourses.splice(i, 1);

        courses.update(id, course);

        res.redirect('/admin/courses');
    } else {
        res.redirect('/login');
    }
});

function format(para) {
    return para.replace(/(.+)/gi, '<p>$1</p>');
}

function snippet(para) {
    return para.slice(0, 250) + '...';
}

module.exports = router;
