// home page
exports.index = function(req, res) {
  res.render('index', {
    navActive: {
      home: true
    },
    title: 'ag'
  });
};