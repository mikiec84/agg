define([
  'backbone',
  'underscore',
  './ProjectModel'
], function(Backbone, _, ProjectModel) {
  return Backbone.Collection.extend({

    model: ProjectModel,
    
    initialize: function () {
      this.url = '/svc/projects';
      this.fetch();
    }

  });
});