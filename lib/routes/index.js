var app      = require('express')(),
    _        = require('lodash'),
    config   = require('../config'),
    projects = require('../json/projects.json'),
    resume   = require('../json/resume.json');

var sections = ['about', 'projects', 'resume'];

var isDev = app.get('env') === 'development';

exports.index = function(req, res, next) {
  var section = req.params.section;
  if (!section || (section && _.contains(sections, section))) {
    res.render('index', _.assign({}, config.mainPage, {
      isDev: isDev,
      bodyStyle: 'home',
      resume: resume,
      copyrightYear: new Date().getFullYear()
    }));
  } else {
    return next();
  }
};

exports.getProjects = function (req, res) {
  res.send(projects);
};