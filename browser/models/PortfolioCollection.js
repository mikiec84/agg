/*global module*/
'use strict';
var Backbone = require('backbone'),
    ProjectModel = require('./ProjectModel');

module.exports = Backbone.Collection.extend({

  model: ProjectModel,
  
  initialize: function () {
    this.url = '/svc/projects';
    this.fetch();
  }

});