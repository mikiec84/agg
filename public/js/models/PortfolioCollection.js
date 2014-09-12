define([
  'backbone',
  'underscore',
  './ProjectModel'
], function(Backbone, _, ProjectModel) {
  var PortfolioCollection = Backbone.Collection.extend({

    model: ProjectModel,
    
    initialize: function () {
      this.url = '/svc/projects';
      this.fetch();
    }

  });

  return PortfolioCollection;
});