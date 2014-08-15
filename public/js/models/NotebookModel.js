define([
  'backbone',
  'underscore',
  'utils',
  'jquery'
], function(Backbone, _, Utils, $) {
  var NotebookModel = Backbone.Model.extend({

    defaults: {
      notebooks: [],
      currentNotebookGUID: '',
      userNotes: {},
      relatedNotes: {},
      currentNoteGUID: '',
      currentNote: {}
    },

    initialize: function () {
      _(this).bindAll('getRelatedNotes');
      this.notesUrl = '/api/notes/';
      this.noteUrl = '/api/note/';
      this.relatedUrl = '/api/related';
      this.on('change:currentNotebookGUID', this.updateSelectedNotebook);
    },

    getUserNotes: function () {
      var self = this,
          url = self.notesUrl + self.get('currentNotebookGUID');

      self.trigger('getUserNotes', {user: true});

      $.get(url, {
        order: 1,
        ascending: false
      })
      .done(function(data) {
        self.unset('userNotes', {silent: true}); // ensure a change event is triggered
        self.set('userNotes', data);
      })
      .fail(function(jqXHR, txtStatus, errorThrown) {
        Utils.showNotification('Evernote', 'Failed to retrieve notes.', 'error');
      })
      .always(function () {
        self.trigger('getUserNotesEnd', {user: true});
      });
    },

    getCurrentNote: function () {
      var self = this,
          url = self.noteUrl + self.get('currentNoteGUID');

      $.get(url)
      .done(function(data) {
        self.set('currentNote', data);
      })
      .fail(function(jqXHR, txtStatus, errorThrown) {
        Utils.showNotification('Evernote', 'Failed to retrieve note.', 'error');
      });
    },

    getRelatedNotes: function (model) {
      var self = this,
          model = model.toJSON();

      self.trigger('getRelatedNotes', {related: true});

      var articleText = $(model.formattedArticle.body).text().replace(/^\s*[\r\n]/gm, "");
      
      $.post(self.relatedUrl, {
        relatedQuery: articleText
      })
      .done(function(data) {
        self.unset('relatedNotes', {silent: true}); // ensure a change event is triggered
        self.set('relatedNotes', data);
      })
      .fail(function(jqXHR, txtStatus, errorThrown) {
        Utils.showNotification('Evernote', 'Failed to retrieve notes.', 'error');
      })
      .always(function () {
        self.trigger('getRelatedNotesEnd', {related: true});
      });
    },

    updateSelectedNotebook: function () {
      var notebooks = this.get('notebooks');
      if (notebooks && notebooks.length) {
        for (var i=0; i < notebooks.length; i++) {
          if (notebooks[i].guid === this.get('currentNotebookGUID')) {
            notebooks[i].isSelected = true;
          } else {
            notebooks[i].isSelected = false;
          }
        }
        this.set('notebooks', notebooks, {silent: true});
      }
    }


  });

  return NotebookModel;
});