var projects = require('../projects.json');

exports.index = function(req, res) {
  res.render('index', {
    title: 'ADAM GRUBER',
    bodyStyle: 'home',
    nav: {
      sections: [
      {
        title: 'About'
      },
      {
        title: 'Portfolio'
      },
      {
        title: 'Resume'
      }]
    }
  });
};

exports.getProjects = function (req, res) {
  res.send(projects);
};