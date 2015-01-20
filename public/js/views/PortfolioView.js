define([
  'backbone',
  './ProjectView',
  'jquery'
], function(Backbone, ProjectView, $) {
  return Backbone.View.extend({

    initialize: function (options) {
      this.options = options;
      this.listenTo(this.collection, 'add', this.addProject);
    },

    addProject: function (project, portfolio) {
      return new ProjectView({
        model: project,
        parentView: this,
        parentEl: this.el,
        templates: this.options.templates
      });
    }

  });
});