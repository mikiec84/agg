define([
  'backbone',
  'templates',
  'jquery'
], function(Backbone, Handlebars, $) {
  var ProjectModel = Backbone.Model.extend({
    defaults: {
      name: '',
      description: '',
      thumbImageUrl: '',
      code: true,
      design: true,
      url: ''
    }

  });
  return ProjectModel;
});