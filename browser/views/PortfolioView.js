'use strict';
var Backbone = require('backbone'),
    ProjectView = require('./ProjectView');

module.exports = Backbone.View.extend({

  initialize: function (options) {
    this.options = options;
    this.listenTo(this.collection, 'add', this.addProject);
  },

  addProject: function (project) {
    return new ProjectView({
      model: project,
      parentView: this,
      parentEl: this.el,
      templates: this.options.templates
    });
  }

});