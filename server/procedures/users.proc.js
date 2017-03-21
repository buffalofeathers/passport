var db = require('../config/db');

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}

exports.all = function() {
    return db.rows('GetUsers');
}

exports.read = function(id) {
    return db.row('GetUser', [id]);
}

exports.create = function(email, hash, firstname, lastname) {
    return db.row('InsertUser', [email, hash, firstname, lastname]);
}