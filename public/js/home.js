/* global window*/
define([
  'backbone',
  './models/PortfolioCollection',
  './views/PortfolioView',
  'moment',
  'handlebars',
  'jquery',
  'jquery.bs',
  'templates'
], function(Backbone, PortfolioCollection, PortfolioView, Moment, Handlebars, $) {

  var agg = function () {
    this.routes = ['', 'portfolio', 'resume', 'contact'];
    this.sections = {};

    // Selectors
    this.$body = $('body');
    this.$window = $(window);

    // Init Things
    this.templates = Handlebars.templates;
    this.initHandlebarsHelpers();

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

  return agg;
});