define([
  'backbone',
  './ProjectView',
  'jquery'
], function(Backbone, ProjectView, $) {
  var PortfolioView = Backbone.View.extend({

    initialize: function () {
      this.collection.bind('add', this.addProject.bind(this));
    },

    addProject: function (project, portfolio) {
      var projectView = new ProjectView({
        model: project,
        parentView: this,
        parentEl: this.el
      });
      return projectView;
    }

  });
  return PortfolioView;
});