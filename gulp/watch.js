'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['inject'], function () {
  gulp.watch([
    paths.src + '/*.html',
    '!' + paths.src + '/index_serve.html',
    '!.tmp/serve/index.html',
    paths.src + '/{app,components}/**/*.less',
    paths.src + '/{app,components}/**/*.js',
    '!' + paths.src + '/app/vendor.css',
    '!' + paths.src + '/app/index.css',
    'bower.json'
  ], ['inject']);
});
