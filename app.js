var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();

// development only
if ('development' == app.get('env')) {
  console.log("development");
  app.set('mongodb_uri', 'mongo');
}

// production only
if ('production' == app.get('env')) {
  console.log("production");
  app.set('mongodb_uri', 'localhost');
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+app.get('mongodb_uri')+'/android_turorial', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
        require('./controllers/exampleData')();
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(cookieParser());
// Use the passport package in our application
app.use(passport.initialize());
app.use(session({secret:'askjdhaskdjh',
                 resave:true,
                 saveUninitialized:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/vehicle', require('./routes/vehicle'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var server = app.listen();
