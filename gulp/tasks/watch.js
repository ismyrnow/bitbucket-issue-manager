'use strict';
var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('watch', function () {
  // Start the server immediately.
  server.run(['index.js']);

  // Restart the server on a change to server-side code.
  gulp.watch(['server/**/*'], function () {
    server.run(['index.js']);
  });
});
