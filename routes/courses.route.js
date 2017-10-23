var express = require('express');
var router = express.Router();
var database = require('../database/dbo');
var db = database.connectTo('courses');

// GET route for reading data
router.get('/', function(req, res, next) {
    var courses = db.find();
    res.render('courses/all', { courses: courses });
});

router.get('/:id', function(req, res, next) {
    var id = Number(req.params.id);
    var course = db.findOne(e => e._id === id);
    res.render('courses/sub', { course: course });
});

router.get('/:id/:courseid', function(req, res, next) {
    var id = Number(req.params.id);
    var cid = Number(req.params.courseid);
    var course = db.findOne(e => e._id === id);
    var subCourse = course.subCourses.find(a => a.id === cid);
    res.render('courses/view', {
        course: subCourse,
        parent: { id: id, name: course.name },
    });
});

module.exports = router;
