define([
  'backbone',
  'underscore',
  'utils',
  'templates',
  'jquery',
  'jquery.bs',
  'jquery.bsValidator'
], function(Backbone, _, Utils, Handlebars, $) {
  var CreateModalView = Backbone.View.extend({

    events: {
      'click .edit-title': 'onEditTitle',
      'focusout #noteTitle': 'setTitle',
      'focusout #noteComments': 'setComments',
      'focusout #noteTags': 'setTags',
      'change #parentNotebook': 'setParentNotebook'
    },

    initialize: function (options, opts) {
      this.options = $.extend(options, opts);
      // Bind context
      _(this).bindAll('hideModal', 'onEditTitle', 'setTitle', 'setComments', 'setTags', 'setParentNotebook');
      
      // Define templates
      this.createModalTmpl = Handlebars.templates['_en-createModal'];
      this.articleTmpl = Handlebars.templates['_article'];

      // Event listeners
      this.listenTo(this.model, 'renderModal', this.renderModal);
      this.listenTo(this.model, 'change:noteTitle', this.renderTitle);
      this.listenTo(this.model, 'renderArticle', this.renderArticle);
      $(document).on('hideModal', this.hideModal);

      // Initial get/render
      this.initialRender();
      this.initBootstrapValidator();
      // Utils.toggleLoader(this.$el, true);
    },

    initialRender: function () {
      // Puts the modal markup on the page
      var modal = this.createModalTmpl({
        noteTitle: '',
        noteBody: '',
        noteBooks: []
      });
      $('body').append(modal);
      this.setElement($('#en-create-modal')[0]);
    },

    initBootstrapValidator: function () {
      var self = this;
      this.$el.find('form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {},
        submitHandler: function(validator, form, submitButton) {
          self.model.handleCreateForm(form);
        }
      });
    },

    renderModal: function (model) {
      // Render note link template
      var modal = this.createModalTmpl({
        noteTitle: this.model.get('noteTitle'),
        noteBody: this.model.get('noteBody'),
        notebooks: this.options.notebookModel.get('notebooks')
      });
      this.model.set('parentNotebook', this.options.notebookModel.get('currentNotebookGUID'));
      this.$el.html($(modal).html());
      this.initBootstrapValidator();
      if (this.model.get('getFullArticle')) {
        Utils.toggleLoader(this.$el, true);
        this.model.getArticle();
      }
      this.showModal();
    },

    renderArticle: function () {
      var data = this.model.get('article');
      data.article.articleBody = this.options.articleView.articleComponent.templates.body(data.article);
      var html = this.articleTmpl(data);
      var formattedArticle = Utils.formatArticleForENML(html);
      this.$el.find('.note-body').html(formattedArticle.body);
      Utils.toggleLoader(this.$el, false);
      this.model.set({
        noteBody: formattedArticle.body,
        formattedArticle: formattedArticle
      });
    },

    renderTitle: function () {
      var $title = this.$el.find('.note-title-text');
      var $titleInput = this.$el.find('#noteTitle');
      var titleTxt = this.model.get('noteTitle');
      $title.text(titleTxt);
      $titleInput.text(titleTxt);
    },

    showModal: function () {
      this.$el.modal('show');
    },

    hideModal: function () {
      this.$el.modal('hide');
    },

    onEditTitle: function (e) {
      var $title = this.$el.find('.note-title');
      var $titleInput = $($title.data('target'));

      e.preventDefault();
      
      $title.addClass('hidden');
      $titleInput.removeClass('hidden').focus();
    },

    setTitle: function (e) {
      var $titleInput = $(e.currentTarget);
      this.model.set('noteTitle', $titleInput.val());
      $titleInput.addClass('hidden');
      this.$el.find('.note-title').removeClass('hidden');
    },

    setComments: function (e) {
      this.model.set('noteComments', $(e.currentTarget).val());
    },

    setTags: function (e) {
      this.model.set('noteTags', $(e.currentTarget).val());
    },

    setParentNotebook: function (e) {
      this.model.set('parentNotebook', $(e.currentTarget).val());
    }

  });

  return CreateModalView;
});