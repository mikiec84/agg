var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var lessMiddleware = require('less-middleware');
var hbs = require('handlebars-precompiler');
var config = require('./config');

var routes = require('./routes/index');

var app = express();
var router = express.Router();

var bootstrapPath = path.join(__dirname, 'bower_components', 'bootstrap');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mu');
app.set('layout', 'layouts/default');
app.set('partials', config.partials);
app.engine('mu', require('hogan-express'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(lessMiddleware(path.join(__dirname, 'source', 'less'), {
  debug: app.get('env') === 'development',
  force: app.get('env') === 'development',
  preprocess: {
    path: function (pathname, req) {
      return pathname.replace('stylesheets/', '');
    }
  },
  dest: path.join(__dirname, 'public'),
  parser: {
    paths: [path.join(bootstrapPath, 'less')],
  }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/fonts', express.static(path.join(bootstrapPath, 'fonts')));
app.use('/templates', express.static(path.join(__dirname, 'views', 'templates')));
app.use(router);

//Routes
router.get('/', routes.index);

// Notes REST API
// router.get('/apitest', function (req, res) {
//   res.render('apitest', {
//     navActive: {
//       api: true
//     },
//     title: 'DJ Evernote API Test',
//     bodyStyle: 'apitest-page',
//     user: req.session.user
//   });
// });
// router.get('/api/notebooks', notes.getNotebooks);
// router.get('/api/tags', notes.getTags);
// router.get('/api/notes/:guid', notes.getNotesByNotebook);
// router.get('/api/note/:guid', notes.getNoteById);
// router.post('/api/note', notes.createNote);
// router.post('/api/note/:guid', notes.updateNote);
// router.delete('/api/note/:guid', notes.deleteNote);
// router.post('/api/related', notes.getRelatedItems);


// Precompile Templates
router.get('/templates.js', function(req, res, next) {
  res.type('application/javascript');
  res.send(hbs.do({
    min: true,
    fileRegex: /\.mu$/,
    templates: [path.join(__dirname, 'views', 'templates')]
  }));
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// var httpPort = (parseInt(process.env.PORT) || 45100);
// app.listen(httpPort);
module.exports = app;
