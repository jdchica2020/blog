require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var passport = require('passport');
require('./app_api/models/db');
require('./app_api/config/passport');

//const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

const app = express();


// sets port 80 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 80);



// view engine setup
// app.set('views', path.join(__dirname, 'app_server', 'views')); 
// app.set('view engine', 'ejs'); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

//app.use('/', indexRouter);
app.use('/api', apiRouter);

// Added per Lab 5 - Angular
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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

module.exports = app;