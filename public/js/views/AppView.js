/*global location*/
define([
  'backbone',
  '../models/PortfolioCollection',
  './PortfolioView',
  'jquery',
  'velocity',
  'slick'
], function(Backbone, PortfolioCollection, PortfolioView, $) {
  return Backbone.View.extend({

    events: {
      'click .navbar-brand': 'onNavClick',
      'click .main-nav a': 'onNavClick'
    },

    initialize: function (options) {
      this.options = options;
      this.navPadding = 40;
      this.projectsRendered = 0;
      this.totalProjects = 4;
      this.$portfolio = $('.portfolio-slider');

      Backbone.history.start({ pushState: true, root: '/' });

      this.initSlick();

      this.portfolioCollection = new PortfolioCollection();
    
      this.portfolioView = new PortfolioView({
        collection: this.portfolioCollection,
        el: this.$portfolio,
        templates: this.options.templates
      });

      this.listenTo(this.portfolioView, 'projectRendered', this.onProjectRendered);
    },

    onProjectRendered: function () {
      this.projectsRendered ++;
      if (this.projectsRendered === this.totalProjects) {
        this.projectsRendered = 0;
        this.scrollToSection(location.pathname, false);
      }
    },

    initSlick: function () {
      this.$portfolio.slick({
        accessibility: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        slide: 'article'
      });
    },

    onNavClick: function (e) {
      e.preventDefault();
      var $btn = $(e.currentTarget),
          href = $btn.attr('href');

      $btn.blur();
      Backbone.history.navigate(href);
      this.scrollToSection(href, true);
    },

    scrollToSection: function (section, animate) {
      var $section = $('#' + section.replace('/', '')),
          sectionTop = $section.length ? $section.offset().top : 0,
          scrollPos = Math.ceil(sectionTop - this.navPadding) + 'px',
          velocityOpts;

      if (animate) {
        velocityOpts = {
          offset: scrollPos,
          easing: [500,35],
          mobileHA: false
        };
      } else {
        velocityOpts = {
          offset: scrollPos,
          duration: 0
        };
      }

      this.$el.velocity('scroll', velocityOpts);
    }

  });
});