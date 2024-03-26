var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require("hbs");
var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');


var mongoose = require("mongoose");
var configs = require("./configs/globals");


var passport = require("passport");
var session = require("express-session");
var User = require("./models/user");
var Article = require("./models/article");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "groupproject2024",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/Articles', articlesRouter);

mongoose
  .connect(configs.ConnectionStrings.MongoDB)
  .then(() => console.log("Connected!"));

  if (process.env.NODE_ENV === "testing") {
    database = process.env.MONGO_URI_TEST;
  }
 

  hbs.registerHelper("toShortDate", (longDateValue) => {
    return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
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

const port = process.env.PORT || 3000; // Define the port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
