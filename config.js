var fs = require('fs');

var sniffEnv = function() {
    var env = fs.readFileSync('./enviroments/enviroment.env');
    console.log('Currently running in [' + env + ']');
    return env;
};

var cors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
};

module.exports = {
    env: sniffEnv(),
    cors: cors,
};
