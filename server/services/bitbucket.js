'use strict';
var format = require('util').format;
var request = require('request');
var Promise = require('bluebird');

function Bitbucket(oauth) {
  this.oauth = oauth;

  // Add oauth token to requests by default.
  request = request.defaults({ oauth: this.oauth });

  Promise.promisifyAll(request);

  // Helper function for making requests without the ceremony.
  this.getJson = function (url) {
    return request.getAsync({ url: url, json: true }).spread(function (res, body) {
      return body;
    });
  };
}

Bitbucket.prototype.repositories = function () {
  return this.getJson('https://bitbucket.org/api/1.0/user/repositories');
};

Bitbucket.prototype.repository = function (account, slug) {
  var repoUrl = format('https://bitbucket.org/api/1.0/repositories/%s/%s', account, slug);
  var issuesUrl = format('https://bitbucket.org/api/1.0/repositories/%s/%s/issues/?sort=kind', account, slug);

  var props = {
    repo: this.getJson(repoUrl),
    issues: this.getJson(issuesUrl)
  };

  return Promise.props(props).then(function (results) {
    var repo = results.repo;
    repo.issues = results.issues.issues;
    return repo;
  });
};

module.exports = Bitbucket;
