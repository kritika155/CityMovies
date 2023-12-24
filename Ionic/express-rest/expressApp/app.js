var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');
var aboutusRouter = require('./routes/aboutus');
var customerRouter = require('./routes/customer');
var cors = require('cors')

//api routes
var authenticateRouter = require('./api/authenticate');
var customersRouter = require('./api/customers');
var moviesRouter = require('./api/movie');
var bookingRouter = require('./api/booking');

var app = express();

app.use(cors());

//secret
var sess = {
  secret: '66t6tvcf4562bged',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}
app.use(session(sess));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/api/authenticate', authenticateRouter);

app.use('/dashboard', dashboardRouter);
app.use('/aboutus', aboutusRouter);
app.use('/customers', customerRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/bookings', bookingRouter);

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
