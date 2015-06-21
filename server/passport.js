'use strict';
var passport = require('passport');
var OAuthStrategy = require('passport-oauth').OAuthStrategy;
var oauthConfig = require('config').get('bitbucket.oauth');
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'passport' });

passport.use('provider', new OAuthStrategy(oauthConfig,
  function(token, tokenSecret, profile, done) {
    var user = { token: token, tokenSecret: tokenSecret };
    log.info(user, 'providerCallback');
    done(null, { token: token, tokenSecret: tokenSecret });
  }
));

passport.serializeUser(function(user, done) {
  log.info({ user: user }, 'serializeUser');
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  log.info({ user: user }, 'deserializeUser');
  done(null, user);
});
