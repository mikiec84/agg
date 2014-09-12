define([
  'backbone',
  './ProjectView',
  'jquery',
  'slick'
], function(Backbone, ProjectView, $) {
  var PortfolioView = Backbone.View.extend({

    initialize: function () {
      this.listenTo(this.collection, 'add', this.addProject);
      this.initSlick();
    },

    initSlick: function () {
      var slickOpts = {
        accessibility: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        slide: 'article',
        centerMode: true,
        centerPadding: '10px',
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      this.$el.slick(slickOpts);
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