var projects = require('../projects.json');
var resume = require('../resume.json');
var _ = require('lodash');

var sections = ['about', 'projects', 'resume'];

exports.index = function(req, res, next) {
  var section = req.params.section;
  if (!section || (section && _.contains(sections, section))) {
    res.render('index', {
      title: 'ADAM GRUBER',
      bodyStyle: 'home',
      nav: {
        sections: [
          {title: 'About', href: '/about'},
          {title: 'Projects', href: '/projects'},
          {title: 'Resume', href: '/resume'}
        ]
      },
      resume: resume,
      copyrightYear: new Date().getFullYear()
    });
  } else {
    return next();
  }
};

exports.getProjects = function (req, res) {
  res.send(projects);
};