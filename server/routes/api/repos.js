'use strict';
var express = require('express');
var loginRedirect = require('../../middleware/login-redirect');
var bitbucketService = require('../../middleware/bitbucket-service');

var router = new express.Router();

router.use(loginRedirect, bitbucketService);

router.get('/', function(req, res) {
  var svc = req.user.bitbucket;
  svc.repositories().then(function (repos) {
    res.send(repos);
  });
});

module.exports = router;
