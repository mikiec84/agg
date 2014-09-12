define([
  'backbone',
  'templates',
  'jquery',
  'slick'
], function(Backbone, Handlebars, $) {
  var ProjectView = Backbone.View.extend({

    events: {
      'click': 'onClick'
    },

    initialize: function (options) {
      this.options = options;
      this.projectTmpl = Handlebars.templates._project;
      this.parentView = this.options.parentView;
      this.$parentEl = $(this.options.parentEl);
      this.render();
    },

    render: function () {
      var project = this.model.toJSON();
      var $html = $(this.projectTmpl(project));
      this.setElement($html);
      this.$parentEl.slickAdd($html);
      return this;
    },

    onClick: function (e) {
      console.log(e.currentTarget);
    }

  });
  return ProjectView;
});