'use strict';
var path = require('path');
var exphbs = require('express-handlebars');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('cookie-session');

var autoLoadRouters = require('./modules/auto-load-routers');
var loginRedirect = require('./middleware/login-redirect');
require('./passport');

var app = express();

var hbs = exphbs.create({
  extname: '.hbs',
  //helpers: helpers,
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
});


// Middleware
// ----------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);
app.engine('html', hbs.engine);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('trust proxy', 1);
app.use(session({ secret: 'foo' }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
// ------

autoLoadRouters(app, './server/routes');
app.get('/', loginRedirect, function(req, res) {
  res.render('index');
});


module.exports = app;
