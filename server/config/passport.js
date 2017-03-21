var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var userProc = require('../procedures/users.proc');
var pool = require('./db').pool;
var utils = require('../utils');

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        userProc.readByEmail(email)
        .then(function(user) {
            if (!user) {
                return done(null, false, { message: 'Incorrect login!' });
            }
            utils.checkPassword(password, user.password)
            .then(function(passwordMatches) {
                if (passwordMatches) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect login!'});
                }
            })
        //     if (user.password !== password) {
        //         return done(null, false, { message: 'Incorrect login!' });
        //     }
        //     return done(null, user);
        }, function(err){
            return done(err);
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userProc.read(id).then(function(user) {
            done(null, user);
        }, function(err) {
            done(err);
        });
    });

    var sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, pool);

    app.use(session({
        secret: 'Jx0B6zETwBQ4',//encrypts the cookie
        store: sessionStore,
        resave: false, //if true, express would resave even if nothing changed
        saveUninitialized: false//because only create sessions and add to the database if user is logged in
    }));

    app.use(passport.initialize());//starts up passport
    app.use(passport.session());//tells passport to work with express-session
}

module.exports = configurePassport;