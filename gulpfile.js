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
      './bin/*',
      './lib/**/*.js',
      '!./node_modules/',
      '!./bower_components/',
    ],
    felint: [
      './browser/**/*.js',
      '!./public/js/',
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