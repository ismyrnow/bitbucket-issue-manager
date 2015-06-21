'use strict';
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'login-redirect' });

module.exports = function loginRedirect(req, res, next) {
  if (req.user) {
    log.info('already authenticated');
    next();
  } else {
    log.info('redirecting to /auth/provider');
    res.redirect('/auth/provider');
  }
};
