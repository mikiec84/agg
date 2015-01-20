define([
  'backbone',
  './views/AppView',
  'moment',
  'handlebars',
  'jquery',
  'templates'
], function(Backbone, AppView, Moment, Handlebars, $) {
  'use strict';

  var agg = function () {
    this.templates = Handlebars.templates;
    this.initHandlebarsHelpers();

    // Create Model/View Instances
    new AppView({
      el: $('html'),
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

  return agg;
});