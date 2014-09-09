define([
  'backbone',
  'underscore',
  './ProjectModel',
  'templates',
  'jquery'
], function(Backbone, _, ProjectModel, Handlebars, $) {
  var PortfolioCollection = Backbone.Collection.extend({
    
    initialize: function () {
      this.svcRoot = '/svc';
      this.getProjects();
    },

    getProjects: function () {
      var self = this,
          url = this.svcRoot + '/projects';

      $.get(url)
      .done(function (data) {
        _.each(data.projects, function (project) {
          self.add(project);
        });
      })
      .fail(function (jqXHR, txtStatus, err) {
        console.log(err);
      });
    }


  });

  return PortfolioCollection;
});