'use strict';
var express = require('express');
var loginRedirect = require('../../middleware/login-redirect');
var bitbucketService = require('../../middleware/bitbucket-service');

var router = new express.Router();

router.use(loginRedirect, bitbucketService);

router.get('/', function (req, res) {
  var svc = req.user.bitbucket;
  svc.repositories().then(function (repos) {
    res.json(repos);
  });
});

router.get('/:account/:slug', function (req, res) {
  var svc = req.user.bitbucket;
  svc.repository(req.params.account, req.params.slug).then(function (repo) {
    res.json(repo);
  });
});

module.exports = router;
