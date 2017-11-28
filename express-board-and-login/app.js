require('./database/db');
require('./database/user_schema');
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var expressSession = require('express-session');
var passport = require('passport');

var app = express();

//DB setting
var databaseUrl = 'mongodb://julee_k:julee_k@ds121906.mlab.com:21906/board';

mongoose.connect(databaseUrl);
var db = mongoose.connection;

db.once('open', function(){
    console.log('DB connected');
});
db.on('error', function(err){
    console.log('DB ERROR : ' + err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());
app.use(expressSession({secret:'my secret'}));

//passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));
app.use('/board', require('./routes/board'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Port setting
app.listen(3000, function(){
    console.log('server on!');
});

module.exports = app;
