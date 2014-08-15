define([
  'backbone',
  'jquery',
  'underscore',
  'utils'
], function(Backbone, $, _, Utils) {
  var NotebookSelectorView = Backbone.View.extend({

    events: {
      'change': 'onSelectNotebook'
    },

    initialize: function () {
      this.$el.removeAttr('data-notebooks');
      _(this).bindAll('render');
      this.listenTo(this.model, 'change:currentNotebookGUID', this.render);
    },

    onSelectNotebook: function (e) {
      this.model.set('currentNotebookGUID', this.$el.val());
    },

    render: function () {
      var $selected = this.$el.find(':selected');
      this.$el.find('option').removeAttr('selected');
      $selected.attr('selected','');

      Utils.setCookie('currentNotebook', this.model.get('currentNotebookGUID'));
    }
    
  });

  return NotebookSelectorView;
});