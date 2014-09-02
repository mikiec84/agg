define([
  'backbone',
  'jquery'
], function (Backbone, $) {
  var Project = Backbone.Model.extend({
    defaults: {
      name: "Evernote Demo",
      description: "Best demo evar!!!!11",
      thumbnailImg: "evernote-screen.png"
    }
  });
  return Project;
});