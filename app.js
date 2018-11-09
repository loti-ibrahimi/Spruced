/*
 Get Spruce Web App
======================
Creator: Loti Ibrahimi | Student Number: 20015453
Description: Web application platform for individual barbers to showcase their cuts - Get Spruce.

Module: Web App Development 2
Lecturer: David Drohan
 */



var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Making use of routes cuts & barbers.
const cuts = require("./routes/cuts");
const barbers = require("./routes/barbers");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);


// ------------- All 'get' routes for Cuts & Barbers --------------- //
//Cuts
app.get('/cuts', cuts.findAll);
app.get('/cuts/:id', cuts.findOne);
app.get('/cuts/barberName/:barberName', cuts.findByBarberName);
app.get('/cuts/cutDate/:cutDate', cuts.findByDate);

//Barbers
app.get('/barbers', barbers.findAll);
app.get('/barbers/:id', barbers.findOne);
app.get('/barbers/barberName/:barberName', barbers.findByBarberName);
app.get('/barbers/region/:region', barbers.findByRegion);


// ------------- All 'post' routes for Cuts & Barbers ---------------- //
//Cuts
app.post('/cuts', cuts.addCut);

//Barbers
app.post('/barbers', barbers.addBarber);



// -------------- All 'put' routes for Cuts & Barbers ----------------- //
//Cuts
app.put('/cuts/:id', cuts.updateCut);
app.put('/cuts/:id/:likes', cuts.incrementLikes);

//Cuts
app.put('/barbers/:id', barbers.updateBarber);
app.put('/barbers/:id/:likes', barbers.incrementLikes);



// -------------- All 'delete' routes for Cuts & Barbers --------------- //
//Cuts
app.delete('/cuts/:id', cuts.deleteCut);
/* Can also implement following for cuts (optional):
- Delete by cutDate: delete all cuts on a specified date.
- Delete by barberName: would delete all cuts from that barber.
*/

//Barbers
app.delete('/barbers/:id', barbers.deleteBarber);



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
