'use strict';
var request = require('request');
var Promise = require('bluebird');

Promise.promisifyAll(request);

function Bitbucket(oauth) {
  this.oauth = oauth;
}

Bitbucket.prototype.repositories = function () {
  return request.getAsync({
    uri: 'https://bitbucket.org/api/1.0/user/repositories',
    oauth: this.oauth
  }).spread(function (response, body) {
    return body;
  });
};

module.exports = Bitbucket;
