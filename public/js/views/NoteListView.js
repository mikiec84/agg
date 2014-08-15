define([
  'backbone',
  'jquery',
  'underscore',
  'utils',
  'templates'
], function(Backbone, $, _, Utils, Handlebars) {
  var NoteListView = Backbone.View.extend({

    events: {
      'click .en-note a': 'onNoteClick',
      'click .refresh-note-list': 'onRefreshNoteList'
    },

    initialize: function (options, opts) {
      this.options = $.extend(options, opts);

      this.isUserNotes = this.$el.hasClass('en-notes-current');
      this.isRelatedNotes = this.$el.hasClass('en-notes-related');

      // Bind context
      _(this).bindAll('updateNoteList', 'render', 'onNoteClick', 'onNoteCreatedInNotebook', 'onRefreshNoteList');
      
      // Cache selectors
      this.$noteList = this.$el.find('.en-notes-list');
      this.$noteListRefreshBtn = this.$el.find('.refresh-note-list');

      // Define templates
      this.noteListItemTmpl = Handlebars.templates['_noteListItem'];

      // Event listeners
      if (this.isUserNotes) {
        this.listenTo(this.model, 'change:currentNotebookGUID', this.updateNoteList);
        this.listenTo(this.model, 'change:userNotes', this.render);
        this.listenTo(this.model, 'getUserNotes', this.onGetNotes);
        this.listenTo(this.model, 'getUserNotesEnd', this.onGetNotesEnd);
      }
      if (this.isRelatedNotes) {
        this.listenTo(this.model, 'change:relatedNotes', this.render);
        this.listenTo(this.model, 'getRelatedNotes', this.onGetNotes);
        this.listenTo(this.model, 'getRelatedNotesEnd', this.onGetNotesEnd);
      }

      if (this.options.articleModel) {
        this.listenTo(this.options.articleModel, 'change:formattedArticle', this.model.getRelatedNotes);
      }

      $(document).on('noteCreated', this.onNoteCreatedInNotebook);

      // Initial get/render
      if (this.isUserNotes) {
        Utils.toggleLoader(this.$el, true);
        this.model.getUserNotes();
      }
    },

    updateNoteList: function () {
      this.$noteList.empty();
      this.model.getUserNotes();
    },

    render: function (model) {
      var userNotes = model.changed.userNotes;
      var relatedNotes = model.changed.relatedNotes;
      var notes = userNotes || relatedNotes;
      if (notes.notes && notes.notes.length) {
        this.$noteList.html(this.noteListItemTmpl(notes));
      } else {
        this.$noteList.html('<li class="en-no-data">No Notes Found</li>');
      }
    },

    onNoteClick: function (e) {
      var url = $(e.currentTarget).attr('href'),
          guid = url.split('/')[2],
          $existingModal = $('#noteModal-' + guid);

      e.preventDefault();

      if ($existingModal.length) {
        $existingModal.modal('show');
      } else {
        this.model.set('currentNoteGUID', guid);
        this.model.getCurrentNote();
      }
    },

    onRefreshNoteList: function (e) {
      $(e.currentTarget).blur();
      this.updateNoteList();
    },

    onNoteCreatedInNotebook: function (e, note) {
      if (this.model.get('currentNotebookGUID') === note.parentNotebook.guid) {
        this.updateNoteList();
      }
    },

    onGetNotes: function () {
      this.$noteList.empty();
      this.$noteListRefreshBtn.addClass('disabled');
      Utils.toggleLoader(this.$el, true);
    },

    onGetNotesEnd: function () {
      this.$noteListRefreshBtn.removeClass('disabled');
      Utils.toggleLoader(this.$el, false);
    }
    
  });

  return NoteListView;
});