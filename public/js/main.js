/* global $ */
/* eslint no-console:0 */

$(function () {

  'use strict';

  $.getJSON('/api/repositories').then(function (results) {
    var repos = results
      .sort(function (a, b) {
        return b.utc_last_updated.localeCompare(a.utc_last_updated);
      })
      .map(function (repo) {
        return {
          name: repo.name,
          account: repo.owner,
          slug: repo.slug
        };
      });

    var ul = $('<ul>');
    repos.forEach(function (repo) {
      ul.append('<li>' + repo.name + '</li>');
    });
    $('.panel-repositories').append(ul);
  });

});
