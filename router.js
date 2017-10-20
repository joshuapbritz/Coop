var home = require('./routes/home.route');
var about = require('./routes/about.route');
var contact = require('./routes/contact.route');
var api = require('./routes/api.route');
var users = require('./routes/user.route');
var auth = require('./routes/auth.route');
<<<<<<< HEAD
var admin = require('./routes/admin.route');
var news = require('./routes/news.route');
=======
var resources = require('./routes/resources.route');
var teachers = require('./routes/teachers.route');
>>>>>>> d192bef64b7642224bc1714692a89409229769b5

module.exports = {
    home: home,
    about: about,
    contact: contact,
    api: api,
    users: users,
    auth: auth,
<<<<<<< HEAD
    news: news,
    admin: admin,
=======
    resources: resources,
    teachers: teachers,
>>>>>>> d192bef64b7642224bc1714692a89409229769b5
};
