define([
  'backbone',
  'jquery',
  'templates',
  'utils',
  'rangy'
], function(Backbone, $, Handlebars, Utils, rangy) {
  var ArticleView = Backbone.View.extend({

    events: {
      'click .en-note-save-full': 'onSaveFull',
      'click .en-note-save-selection': 'onSaveSelection',
      'mousedown .article-body': 'onTextSelect',
      'mouseup .article-body': 'onTextSelect'
    },

    initialize: function (options, opts) {
      this.options = $.extend(options, opts);

      // Selectors
      this.articleContainerID = 'article-cont';
      this.$articleContainer = this.$el.find('#' + this.articleContainerID);

      // Define templates
      this.errorTmpl = Handlebars.templates['_error'];
      this.noDataTmpl = Handlebars.templates['_noData'];
      this.articleTmpl = Handlebars.templates['_article'];
      this.popoverTmpl = Handlebars.templates['_en-popover'];
      this.noteSelectionTmpl = Handlebars.templates['_en-noteSelection'];

      // Event Listeners
      this.listenTo(this.model, 'change:article', this.renderArticle);
      this.listenTo(this.model, 'getArticle', this.onGetArticle);
      this.listenTo(this.model, 'getArticleEnd', this.onGetArticleEnd);

      rangy.init();

      // Initialize PA Component
      this.initPortalArticleComponent();
    },

    initPortalArticleComponent: function () {
      var self = this;
      DJ.add("PortalArticle", {
        container: this.articleContainerID,
        options: this.model.get('componentOptions'),
        templates: {
          success: self.articleTmpl,
          noData: self.noDataTmpl,
          error: self.errorTmpl
        }
      })
      .done(function (component) {
        self.articleComponent = component;
      })
      .fail(function (err) {
        var msg = 'Error initializing the article viewer: ' + err;
        Utils.showNotification('PortalArticle', msg, 'error');
      });
    },

    onGetArticle: function () {
      Utils.toggleLoader(this.$el, true);
    },

    onGetArticleEnd: function () {
      Utils.toggleLoader(this.$el, false);
    },

    renderArticle: function (model) {
      var data = model.changed.article;
      
      this.$articleContainer.empty();
      data.article.articleBody = this.articleComponent.templates.body(data.article);
      this.articleComponent.setData(data);
      this.model.set('formattedArticle', Utils.formatArticleForENML(this.articleTmpl(data)));

      // after render get related notes
      // this.getRelatedNotes();
    },

    onSaveFull: function (e) {
      var model = this.model.toJSON();
      this.options.createModalModel.set({
        noteTitle: model.formattedArticle.title,
        noteBody: model.formattedArticle.body,
        getFullArticle: false
      });
      this.options.createModalModel.trigger('renderModal');
    },

    onSaveSelection: function () {
      var model = this.model.toJSON();
      this.options.createModalModel.set({
        noteTitle: 'Excerpt - ' + model.formattedArticle.title,
        noteBody: this.noteSelectionTmpl({
          article: model.article.article,
          selection: model.articleSelection
        }),
        getFullArticle: false
      });
      this.options.createModalModel.trigger('renderModal');
    },

    onTextSelect: function (e) {
      var self = this;

      switch (e.type) {
      case 'mousedown':
        $(document).trigger('hidePopovers');
        break;
      case 'mouseup':
        var sel = rangy.getSelection(),
            selStr = sel.toString(),
            selHtml = sel.toHtml(),
            articlePanelPos = this.$el.offset(),
            $selectionPopover = this.$el.find('#selectionPopover');

        if (selStr !== "") {
          e.stopPropagation();

          // if selection string is not empty and does not match selection html
          // then the selection contains html and we have to format it
          if (selStr !== selHtml) {
            var $sel = $(selHtml),
                selHasHtml = true,
                selHtmlStr = '';

            $sel.find('*').removeAttr('id').removeAttr('class');
            $sel.each(function(i, val) {
              if (val.innerHTML) {
                selHtmlStr += val.innerHTML;
              }
            });
          }

          // if the popover anchor doesn't exist, create it
          if (!$selectionPopover.length) {
            var $popoverEl = $('<div id="selectionPopover" />');
            $popoverEl
              .css({
                position: 'absolute',
                width: 1,
                height: 10,
                top: e.clientY - articlePanelPos.top + $(document).scrollTop(),
                left: e.clientX - articlePanelPos.left + $(document).scrollLeft()
              })
              .appendTo(this.$el);
          } else {
            // otherwise just set its position
            $selectionPopover.css({
              top: e.clientY - articlePanelPos.top + $(document).scrollTop(),
              left: e.clientX - articlePanelPos.left + $(document).scrollLeft()
            });
          }

          $('#selectionPopover').popover({
            html: true,
            placement: 'bottom',
            container: self.$el.find('.panel-body'),
            trigger: 'manual',
            content: self.popoverTmpl({isSelection: true})
          });

          this.model.set('articleSelection', selHasHtml ? selHtmlStr : selStr);

          $('#selectionPopover').popover('show').addClass('popover-showing');
        }
        break;
      }
    }

  });

  return ArticleView;
});