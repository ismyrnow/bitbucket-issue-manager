'use strict';
var bunyan = require('bunyan');
var oauthConfig = require('config').get('bitbucket.oauth');
var Bitbucket = require('../services/bitbucket');

var log = bunyan.createLogger({ name: 'bitbucket-service' });

module.exports = function bitbucketService(req, res, next) {

  if (!req.user) {
    log.error('no user object found! unable to initialize service.');
    return res.setStatus(401).send('Unauthorized');
  }

  var oauth = {
    'token': req.user.token,
    'token_secret': req.user.tokenSecret,
    'consumer_key': oauthConfig.consumerKey,
    'consumer_secret': oauthConfig.consumerSecret
  };

  var bitbucket = new Bitbucket(oauth);
  req.user.bitbucket = bitbucket;

  log.info('service created and attached to req.user');

  next();
};
