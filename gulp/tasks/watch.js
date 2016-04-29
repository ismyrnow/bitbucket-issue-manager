'use strict';
var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('watch', function () {
  // Start the server immediately.
  var server = gls.new('index.js');
  server.start();

  // Restart the server on a change to server-side code.
  gulp.watch(['server/**/*'], function (file) {
    server.notify.apply(server, [file]);
  });
});
