var createError = require('./node_modules/http-errors');
var express = require('./node_modules/express');
var path = require('path');
var cookieParser = require('./node_modules/cookie-parser');
var logger = require('./node_modules/morgan');
var session=require('./node_modules/express-session');

myDB={};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//동적 view ejs,pug,jsp,php,asp
app.set('view engine', 'ejs');
app.engine('html',require('./node_modules/ejs/lib/ejs').renderFile);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//js,css,img
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('My Web'));
app.use(session({
  name:'HBY_SID',
  timeout:30,
  resave:false,//재할당 x
  saveUninitialized:false,//저장 내용없으면 할당 받지 않겠다?
  secret:'My Web',
  cookie:{
    httpOnly:true,
    secure:false
   
  }
  }));


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/about', require('./routes/about'));
app.use('/member_insert', require('./routes/member_insert'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/search_carInfo_template', require('./routes/search_carInfo_template'));
app.use('/search_carInfo', require('./routes/search_carInfo'));

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
