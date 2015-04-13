'use strict';

var gulp = require('gulp');
var rename = require("gulp-rename");
var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject', ['styles'], function () {

  var injectStyles = gulp.src([
    paths.tmp + '/serve/{app,components,plugins}/**/*.css',
    '!' + paths.tmp + '/serve/app/vendor.css'
  ], { read: false });

  var injectScripts = gulp.src([
    paths.src + '/{app,components,plugins}/**/*.js',
    '!' + paths.src + '/{app,components}/**/*.spec.js',
    '!' + paths.src + '/{app,components}/**/*.mock.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    addRootSlash: false,
  };

  var injectOptionsFlask = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    addRootSlash: false,
    transform: function(filePath){
      if (filePath.slice(-3) === '.js') {
        return '<script src="../' + filePath + '">'+'</script>';
      }
      else if(filePath.slice(-4) === '.css'){
        return '<link rel="stylesheet" href="../'+filePath+'"/>';
      }
      return $.inject.transform.apply($.inject.transform, arguments);
    }
  };

  var wiredepOptions = {
    directory: 'bower_components',
    exclude: [/bootstrap\.js/, /bootstrap\.css/, /bootstrap\.css/, /foundation\.css/]
  };

  gulp.src([paths.src + '/*.html', '!' + paths.src + '/index_serve.html'])
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(rename("index_serve.html"))
    .pipe(gulp.dest(paths.src));

  return gulp.src([paths.src + '/*.html', '!' + paths.src + '/index_serve.html'])
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp + '/serve'))

});
