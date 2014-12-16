/* global window*/
define([
  'backbone',
  './models/PortfolioCollection',
  './views/PortfolioView',
  'moment',
  'handlebars',
  'jquery',
  'jquery.bs',
  'templates',
  'velocity'
], function(Backbone, PortfolioCollection, PortfolioView, Moment, Handlebars, $) {

  var agg = function () {
    // Selectors
    this.$body = $('body');
    this.$window = $(window);
    this.navPadding = 40;

    // Init Things
    Backbone.history.start({ pushState: true, root: '/' });
    
    this.templates = Handlebars.templates;
    this.initHandlebarsHelpers();
    this.initEventListeners();

    // Create Model/View Instances
    var portfolioCollection = new PortfolioCollection();
    var portfolioView = new PortfolioView({
      collection: portfolioCollection,
      el: $('.portfolio-slider'),
      templates: this.templates
    });
    
  };

  agg.prototype.initHandlebarsHelpers = function () {
    Handlebars.registerHelper('dateFormat', function(context, format) {
      if (format === 'fromNow') {
        return Moment(context).fromNow();
      } else {
        return Moment(context).format(format);
      }
    });
  };

  agg.prototype.onResize = function (e) {
    console.log(e);
  };

  agg.prototype.initEventListeners = function () {
    $('.main-nav a').on('click', this.onNavClick.bind(this));
  };

//TODO move this to a navigation view or just a main app view
  agg.prototype.onNavClick = function (e) {
    e.preventDefault();
    var $btn = $(e.currentTarget),
        href = $btn.attr('href'),
        sectionTop = $('#' + href.replace('/', '')).offset().top,
        scrollPos = Math.ceil(sectionTop - this.navPadding) + 'px';

    $btn.blur();
    
    Backbone.history.navigate(href);
    $('html').velocity('scroll', {
      offset: scrollPos,
      easing: [500,35],
      mobileHA: false
    });
  };

  return agg;
});