/*global $*/
'use strict';
var Backbone = require('backbone'),
    ProjectTmpl = require('../../lib/views/templates/_project.mu');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function (options) {
    this.options = options;
    this.projectTmpl = ProjectTmpl;
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