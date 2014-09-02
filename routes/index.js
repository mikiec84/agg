// home page
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
    },
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