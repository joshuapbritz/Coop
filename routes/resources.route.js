var express = require('express');
var router = express.Router();

// GET route for reading data
router.get('/', function(req, res, next) {
    res.render('resources', { title: 'Download Resources' });
});

router.get('/download/:filename', function(req, res) {
    var filename = req.params.filename;
    res.download('C:\\absolute\\path\\to\\[filename]');
})

module.exports = router;
