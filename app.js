var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

// Bootstrap models
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) {
    require(models_path + '/' + file);
  }
});

// Connect to mongodb
var rrpodcastsfetch = require('./modules/rrpodcastsfetch');
var connect = function () {
  mongoose.connect(config.mongodb.uri, config.mongodb.options);
};
connect();

mongoose.connection.on('open', function(){
  console.log("MongoDB connection open");
  rrpodcastsfetch.start();
});

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
});





var routes = require('./routes/index');
app.use('/api', routes);

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
