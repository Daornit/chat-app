const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const parseCookie = require('cookie').parse;
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const errorHandler = require('errorhandler');
const config = require('./config')
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const app = express();

// redis set up
const redis = require('redis');
const redisClient = redis.createClient();
const RedisStore = require('connect-redis')(session);
const redisStore = new RedisStore({ host: 'localhost', port: 6379, client: redisClient});

var sessionService = require('./shared/session-service');
sessionService.initializeRedis(redisClient, redisStore);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(config.allowedCORSOrigins));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure mongoose
mongoose.connect('mongodb://localhost/chat-app-test');
mongoose.set('debug', true);

// password config must be below all models
const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
  }, (email, password, done) => {
    Users.findOne({ email })
      .then((user) => {
        if(!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
  
        return done(null, user);
      }).catch(done);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  Users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
  });
});

const sessionMiddleware = session({ 
  store: redisStore,
  key: config.sessionCookieKey,
  secret: config.sessionSecret,
  resave: true, 
  saveUninitialized: true,
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

app.use(require('./routes'))

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';


if(!isProduction) {
  app.use(errorHandler());
}

const port = process.env.PORT || config.serverPort;

module.exports = {
  app: app,
  port: port,
  sessionMiddleware: sessionMiddleware
}