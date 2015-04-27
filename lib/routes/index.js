var _        = require('lodash'),
    config   = require('../config'),
    projects = require('../json/projects.json'),
    resume   = require('../json/resume.json');

var sections = ['about', 'projects', 'resume'];

exports.index = function(req, res, next) {
  var section = req.params.section;
  if (!section || (section && _.contains(sections, section))) {
    res.render('index', _.assign({}, config.mainPage, {
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