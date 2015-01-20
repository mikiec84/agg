define([
  'backbone',
  'jquery'
], function(Backbone, $) {
  return Backbone.View.extend({

    events: {},

    initialize: function (options) {
      this.options = options;
      this.projectTmpl = this.options.templates._project;
      this.parentView = this.options.parentView;
      this.$parentEl = $(this.options.parentEl);
      this.render();
    },

    render: function () {
      var project = this.model.toJSON(),
          $html = $(this.projectTmpl(project));
      this.setElement($html);
      this.$parentEl.slickAdd($html);
      this.parentView.trigger('projectRendered');
      return this;
    }

  });
});