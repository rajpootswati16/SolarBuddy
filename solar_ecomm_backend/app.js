var createError = require('http-errors');
var express = require('express');
var cors=require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandsRouter = require('./routes/brands')
var categoryRouter = require('./routes/category')
var subcategoryRouter = require('./routes/subcategory')
var productRouter = require('./routes/product')
var productdetailsRouter = require('./routes/productdetails')
var adminRouter= require('./routes/admin')
var bannerRouter=require('./routes/banner')
var userinterfaceRouter=require('./routes/userinterface')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brands', brandsRouter)
app.use('/category', categoryRouter)
app.use('/subcategory', subcategoryRouter)
app.use('/product', productRouter)
app.use('/productdetails', productdetailsRouter)
app.use('/admin', adminRouter)
app.use('/banner', bannerRouter)
app.use('/userinterface',userinterfaceRouter)

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
