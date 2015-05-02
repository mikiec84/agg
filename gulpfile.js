var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    jshint     = require('gulp-jshint'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename     = require('gulp-rename'),
    assign     = require('lodash').assign,
    options;

options = {
  browserify: {
    entries: './browser/main.js',
    debug: false
  },
  watchify: {
    ignoreWatch: true
  },
  hbsfy: {
    extensions: 'mu'
  },
  rename: {
    extname: '.min.js'
  },
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
    ],
    bundleDest: './public/js/'
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

gulp.task('watchify', function () {
  var w = watchify(browserify(assign({}, watchify.args, options.browserify, options.watchify)));
  w.on('update', bundle.bind(this, w)); // on any dep update, runs the bundler
  w.on('log', gutil.log); // output build logs to terminal
  bundle(w);
});

gulp.task('browserify', function () {
  var b = browserify(options.browserify);
  bundle(b);
});

function bundle (b) {
  b.transform('hbsfy', options.hbsfy);
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest(options.paths.bundleDest))
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(rename(options.rename))
    .pipe(gulp.dest(options.paths.bundleDest));
}

gulp.task('build', ['lint', 'felint', 'browserify'], function() {});

gulp.task('default', ['watchify'], function() {});