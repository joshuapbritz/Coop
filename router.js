var home = require('./routes/home.route');
var about = require('./routes/about.route');
var contact = require('./routes/contact.route');
var api = require('./routes/api.route');
var users = require('./routes/user.route');
var auth = require('./routes/auth.route');
var resources = require('./routes/resources.route');
var teachers = require('./routes/teachers.route');

module.exports = {
    home: home,
    about: about,
    contact: contact,
    api: api,
    users: users,
    auth: auth,
    resources: resources,
    teachers: teachers,
};
