var path = require('path');
var express = require('express');
var router = express.Router();
var routes = require('./routes/index');
var hbs = require('handlebars-precompiler');

module.exports = router;

// Define Routes
router.get('/', routes.index);
router.get('/svc/projects', routes.getProjects);


// Precompile Templates
router.get('/templates.js', function(req, res, next) {
  res.type('application/javascript');
  res.send(hbs.do({
    min: true,
    fileRegex: /\.mu$/,
    templates: [path.join(__dirname, 'views', 'templates')],
    amd: true
  }));
});