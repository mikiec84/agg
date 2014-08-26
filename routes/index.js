// home page
exports.index = function(req, res) {
  res.render('index', {
    title: 'adam gruber',
    bodyStyle: 'home',
    portfolio: {
      projects: [{
        projectName: "Evernote Demo",
        description: "Best demo evar!!!!11",
        bgImage: "evernote-screen.png"
      },
      {
        projectName: "Factiva Newsletter Builder"
      },
      {
        projectName: "DJX"
      }
      ]
    }
  });
};