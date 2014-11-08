var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    options;

options = {
  jshintrc: {
    server: './.jshintrc',
    client: './client.jshintrc'
  },
  paths: {
    lint: [
      './*.js',
      './bin/*.js',
      './routes/*.js',
      '!./node_modules/',
      '!./bower_components/',
    ],
    felint: [
      './public/js/**.js',
      '!./public/js/common.js',
      '!./public/js/modernizr.min.js',
      '!./node_modules/',
      '!./bower_components/',
    ]
  }
};

gulp.task('lint', function () {
  return gulp.src(options.paths.lint)
    .pipe(jshint(options.jshintrc.server))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('felint', function () {
  return gulp.src(options.paths.felint)
    .pipe(jshint(options.jshintrc.client))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['lint', 'felint'], function() {
});