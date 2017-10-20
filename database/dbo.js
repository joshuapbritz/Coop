var fs = require('fs');
var path = require('path');

class Database {
    constructor(name) {
        if (!fs.existsSync('./database/data')) {
            fs.mkdirSync('./database/data');
        }
        if (!fs.existsSync('./database/data/' + name)) {
            fs.mkdirSync('./database/data/' + name);
        }
        if (
            !fs.existsSync('./database/data/' + name + '/' + name + 'Data.txt')
        ) {
            fs.writeFileSync(
                './database/data/' + name + '/' + name + 'Data.txt',
                ''
            );
        }

        this.pathUrl = __dirname + '/data/' + name + '/' + name + 'Data.txt';
    }

    _fetch() {
        var file = '[' + fs.readFileSync(this.pathUrl) + ']';
        var data = JSON.parse(file);
        return data;
    }

    _save(obj) {
        var len = this._fetch().length;
        var comma = len > 0 ? ',' : '';
        fs.appendFileSync(this.pathUrl, comma + JSON.stringify(obj));
    }

    _update(obj) {
        var file = this._fetch();
        var id = obj._id;
        var index = file.findIndex(v => v._id === id);
        file[index] = obj;
        var wf = '';
        file.forEach(e => {
            var comma = wf === '' ? '' : ',';
            wf += comma + JSON.stringify(e);
        });
        fs.writeFileSync(this.pathUrl, wf);
    }

    _delete(id) {
        var file = this._fetch();
        var index = file.findIndex(v => v._id === id);
        file.splice(index, 1);
        var wf = '';
        file.forEach(e => {
            var comma = wf === '' ? '' : ',';
            wf += comma + JSON.stringify(e);
        });
        fs.writeFileSync(this.pathUrl, wf);
    }

    find(find) {
        // Load File
        var dbData = this._fetch();

        // Do Stuff
        var query = false;
        if (find !== void 0) {
            query = true;
        }
        if (query) {
            var data = dbData.filter(find);
            if (data) {
                return data;
            } else {
                return undefined;
            }
        } else {
            return dbData;
        }
    }

    findId(id) {
        var dbData = this._fetch();
        var data = dbData.find(v => v._id === id);
        if (data) {
            return data;
        } else {
            return undefined;
        }
    }

    findOne(find) {
        var dbData = this._fetch();
        var data = dbData.find(find);
        if (data) {
            return data;
        } else {
            return undefined;
        }
    }

    create(obj) {
        var dbData = this._fetch();

        if (dbData.length === 0) {
            obj._id = 1;
        } else {
            obj._id = dbData[dbData.length - 1]._id + 1 || 1;
        }

        this._save(obj);

        return obj;
    }

    update(id, obj) {
        var dbData = this._fetch();

        var data = dbData.find(v => v._id === id);
        if (data) {
            obj._id = data._id;
            this._update(obj);
            return obj;
        } else {
            return undefined;
        }
    }

    delete(id) {
        var dbData = this._fetch();
        var data = dbData.find(v => v._id === id);
        if (data) {
            this._delete(id);
            return data;
        } else {
            return undefined;
        }
    }
}

var connect = function(name) {
    if (name) {
        var connection = new Database(name);
        return connection;
    } else {
        throw new Error('No Database specified.');
    }
};

exports.connectTo = connect;
