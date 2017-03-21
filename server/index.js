var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var api = require('./api');
var configurePassport = require('./config/passport');

var clientPath = path.join(__dirname, '../client');

var app = express();

app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

app.use('/api', api);
// state routing goes here (push state)
app.listen(3000);