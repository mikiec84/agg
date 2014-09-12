define([
  'backbone',
  './models/PortfolioCollection',
  './views/PortfolioView',
  './views/SectionView',
  'templates',
  'nprogress',
  'moment',
  'jquery',
  'jquery.bs',
  'jquery.typeahead'
], function(Backbone, PortfolioCollection, PortfolioView, Section, Handlebars, NProgress, Moment, $) {

  var agg = function () {
    this.routes = ['', 'portfolio', 'resume', 'contact'];
    this.sections = {};

    // Selectors
    this.$body = $('body');
    this.$window = $(window);

    // Init Things
    this.initHandlebarsHelpers();
    // this.initSections();

    // this.initTypeahead();


    // Create Model/View Instances
    var portfolioCollection = new PortfolioCollection();
    var portfolioView = new PortfolioView({
      collection: portfolioCollection,
      el: $('.portfolio-slider')
    });
    
  };

  agg.prototype.initTypeahead = function () {

    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
          }
        });

        cb(matches);
      };
    };

    var sections = ['About', 'Resume', 'Contact', 'Work'];

    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'agg',
      displayKey: 'value',
      source: substringMatcher(sections)
    });
  };

  agg.prototype.initHandlebarsHelpers = function () {
    Handlebars.registerHelper('dateFormat', function(context, format) {
      if (format === "fromNow") {
        return Moment(context).fromNow();
      } else {
        return Moment(context).format(format);
      }
    });
  };

  agg.prototype.onResize = function (e) {
    console.log(e);
  };

  agg.prototype.initSections = function () {
      var route, i;

      // init View for each route
      for (i = 0; i < this.routes.length; i++) {
        route = this.routes[i];
        this.sections['/' + route] = new Section({
          el: $('#' + (route === '' ? 'intro' : route)),
          $body: this.$body,
          $window: this.$window
        });
      }

      // set current section and scroll to it, if it's below the fold
      this.currentSection = location.pathname;
      if (this.currentSection !== '/') {
        this.sections[this.currentSection].scroll();
      }
  };

  return agg;
});