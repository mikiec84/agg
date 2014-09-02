define([
  'backbone',
  'jquery'
], function (Backbone, $) {
  var Section = Backbone.View.extend({
    config: {
      container: '.container',
      scroll_speed: 600,
      easing: 'easeInOutExpo'
    },

    /**
     * Call this function in the initalize of the child view, in order to inherit from Section!
     * Example: var exampleSection = Section.extend({
     *            initialize: function(options) {
     *              this._super(options);
     *            }, ...
     */
    _super: function () {
      this.constructor.__super__.initialize.apply(this, arguments);
    },

    initialize: function(options) {
      this.$body = options.$body;
      this.$window = options.$window;
      this.buffer = null;
      // this.setHeight();
      // this.$window.on('resize', this.setHeight.bind(this));
    },

    setHeight: function () {
      // grab height of the sections root container
      var height = this.$el.find(this.config.container).height();

      // force height to 480px if it is less
      if (height === 0 || height < this.$window.height()) {
        height = this.$window.height() > 480 ? this.$window.height() : 480;
      }

      // set height on body, and section root element
      this.$body.height(height);
      this.$el.height(height);
    },

    scroll: function () {
      // scroll to the top of the sections root element
      this.$body.animate({
        scrollTop: this.$el.offset().top,
        easing: this.config.easing
      }, this.config.scroll_speed);
    }
  });
  return Section;
});