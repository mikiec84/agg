var path = require('path');
var express = require('express');
var router = express.Router();
var routes = require('./routes/index');
var hbs = require('handlebars-precompiler');

module.exports = router;

// Define Routes
router.get('/', routes.index);


// Precompile Templates
router.get('/templates.js', function(req, res, next) {
  res.type('application/javascript');
  res.send(hbs.do({
    min: true,
    fileRegex: /\.mu$/,
    templates: [path.join(__dirname, 'views', 'templates')]
  }));
});