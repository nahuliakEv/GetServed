﻿'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var expressSession = require("express-session");
var MongoStore = require("connect-mongo")(expressSession);
var mongoose = require('mongoose');
var settings = require('./modules/settings');
var app = express();
var cors = require("cors");

mongoose.connect(settings.urlMongo, {useNewUrlParser: true});

var routes = require('./routes/index');
var flash = require('connect-flash');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'mySecretKey',
    name: 'sessionId',
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 3*24*60*60,
        autoRemove: 'interval',
        autoRemoveInterval: 10
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);
var routes = require('./routes/index')(passport);

app.use(cors());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
