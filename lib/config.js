// Config
module.exports = {
  partials: {
    navbar: 'partials/_navbar',
    intro: 'partials/_intro',
    about: 'partials/_about',
    portfolio: 'partials/_portfolio',
    resume: 'partials/_resume',
    footer: 'partials/_footer'
  },
  mainPage: {
    title: 'ADAM GRUBER',
    nav: {
      sections: [
        {title: 'About', href: '/about'},
        {title: 'Projects', href: '/projects'},
        {title: 'Resume', href: '/resume'}
      ]
    }
  }
};