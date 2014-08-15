define([
  'backbone',
  'underscore',
  'templates',
  'jquery',
  'jquery.bs'
], function(Backbone, _, Handlebars, $) {
  var NoteModalView = Backbone.View.extend({

    events: {
      'change': 'onSelectNotebook'
    },

    initialize: function () {
      _(this).bindAll('render');
      this.noteModalTmpl = Handlebars.templates['_en-noteModal'];
      this.listenTo(this.model, 'change:currentNote', this.render);
    },

    render: function (model) {
      var modal = this.noteModalTmpl(model.get('currentNote'));
      $(modal).filter('.modal').modal();
    }
    
  });

  return NoteModalView;
});