define([
  'backbone',
  './ProjectView',
  'jquery',
  'slick'
], function(Backbone, ProjectView, $) {
  var PortfolioView = Backbone.View.extend({

    initialize: function (options) {
      this.options = options;
      this.listenTo(this.collection, 'add', this.addProject);
      this.initSlick();
    },

    initSlick: function () {
      var slickOpts = {
        accessibility: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        slide: 'article'
      };
      this.$el.slick(slickOpts);
    },

    addProject: function (project, portfolio) {
      var projectView = new ProjectView({
        model: project,
        parentView: this,
        parentEl: this.el,
        templates: this.options.templates
      });
      return projectView;
    }

  });
  return PortfolioView;
});