var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var usersRouter = require('./routes/user.route');
var categorieRouter = require('./routes/categorie.route');
var deviceTokenRouter = require('./routes/deviceToken.route');
var notificationRouter = require('./routes/notification.route');
var articleRouter = require('./routes/article.route');
var avisRouter = require('./routes/avis.route');
var favoriRouter = require('./routes/favoris.route');
var app = express();
require('./dbconnection/db');
require('./notification/notificationAuth');
app.disable('etag');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/categories', categorieRouter);
app.use('/api/deviceTokens', deviceTokenRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/articles', articleRouter);
app.use('/api/avis', avisRouter);
app.use('/api/favoris', favoriRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
