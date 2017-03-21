var express = require('express');
var users = require('./controllers/users.ctrl');

var router = express.Router();

router.use('/users', users);

module.exports = router;
