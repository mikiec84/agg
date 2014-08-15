define([
  'backbone',
  'templates',
  'utils',
  'jquery'
], function(Backbone, Handlebars, Utils, $) {
  var HeadlinesView = Backbone.View.extend({

    events: {
      'click .en-note-save-link': 'onSaveLink',
      'click .en-note-save-full': 'onSaveFull'
    },

    initialize: function (options, opts) {
      this.options = $.extend(options, opts);

      // Selectors
      this.headlinesContainerID = 'headlines-cont';
      this.$headlinesContainer = this.$el.find('#' + this.headlinesContainerID);
      this.$paginationBtnPrev = this.$el.find('.prev');
      this.$paginationBtnNext = this.$el.find('.next');

      // Define templates
      this.errorTmpl = Handlebars.templates['_error'];
      this.noDataTmpl = Handlebars.templates['_noData'];
      this.headlinesTmpl = Handlebars.templates['_headlines'];
      this.popoverTmpl = Handlebars.templates['_en-popover'];
      this.noteLinkTmpl = Handlebars.templates['_en-noteLink'];

      // Event Listeners
      this.listenTo(this.model, 'change:headlines', this.renderHeadlines);
      this.listenTo(this.model, 'getHeadlines', this.onGetHeadlines);
      this.listenTo(this.model, 'getHeadlinesEnd', this.onGetHeadlinesEnd);

      // Initialize PHL Component
      this.initPortalHeadlineComponent();
    },

    initPortalHeadlineComponent: function () {
      var self = this;
      DJ.add("PortalHeadlineList", {
        container: self.headlinesContainerID,
        options: {
          displaySnippets: 0,
          allowPagination: true,
          circularPaging: false,
          pageSize: 5,
          pageDirection: 'horizontal',
          pageSpeed: 500,
          pagePrevSelector: self.$paginationBtnPrev,
          pageNextSelector: self.$paginationBtnNext,
          maxNumHeadlinesToShow: 20
        },
        templates: {
          successHeadline: self.headlinesTmpl,
          noData: self.noDataTmpl,
          error: self.errorTmpl
        }
      })
      .done(function (component) {
        self.headlinesComponent = component;
        // Attach event handlers
        component.on("headlineClick.dj.PortalHeadlineList", self.onHeadlineClick.bind(self));
        component.on("headlineEntryClick.dj.PortalHeadlineList", self.onHeadlineEntryClick.bind(self));
        component.on("componentRendered.dj.PortalHeadlineList", self.updatePageIndex.bind(self));
        component.on("pageIndexChanged.dj.PortalHeadlineList", self.updatePageIndex.bind(self));
      })
      .fail(function (err) {
        var msg = 'Error initializing the article viewer: ' + err;
        Utils.showNotification('PortalArticle', msg, 'error');
      });
    },

    onGetHeadlines: function () {
      Utils.toggleLoader(this.$el, true);
    },

    onGetHeadlinesEnd: function () {
      Utils.toggleLoader(this.$el, false);
    },

    renderHeadlines: function (model) {
      var self = this,
          headlines = model.changed.headlines.headLines.headlines;

      this.$headlinesContainer.removeClass('hidden');

      if (typeof headlines === "undefined") {
        return false;
      }
      
      this.headlinesComponent._setData({
        resultSet: headlines.portalHeadlineListDataResult.resultSet
      });

    },

    onHeadlineClick: function (data) {
      this.$el.find('.headline').removeClass('selected');
      $(data.event.currentTarget).parent('li').addClass('selected');
      this.options.articleModel.set('currentArticleRef', data.headline.reference);
      this.options.articleModel.getArticle();
    },

    onHeadlineEntryClick: function (data) {
      var self = this;
      var $target = $(data.event.target);

      // Make sure this event was triggered by evernote link
      if (!$target.hasClass('evernote')) {
        return false;
      }

      // Hide any other popovers that are showing
      $(document).trigger('hidePopovers');

      var $btn = $target.parent();

      if (!$btn.hasClass('popover-showing')) {
        $btn.popover({
          html: true,
          placement: 'bottom',
          container: '.panel-headlines .panel-body',
          trigger: 'manual',
          content: self.popoverTmpl(data.headline)
        });
      }

      $btn.popover('toggle').toggleClass('popover-showing');
    },

    updatePageIndex: function (data) {
      this.$paginationBtnPrev.removeClass('hidden').toggleClass('disabled', data.currentPageIndex === 0);
      this.$paginationBtnNext.removeClass('hidden').toggleClass('disabled', data.currentPageIndex === data.pagesCount - 1);
    },

    onSaveLink: function (e) {
      var $link = $(e.currentTarget),
          linkData = $link.data();
      this.options.createModalModel.set({
        noteTitle: $.trim(linkData.title),
        noteBody: this.noteLinkTmpl(linkData),
        getFullArticle: false
      });
      this.options.createModalModel.trigger('renderModal');
    },

    onSaveFull: function (e) {
      var $link = $(e.currentTarget),
          linkData = $link.data();
      this.options.createModalModel.set({
        noteTitle: $.trim(linkData.title),
        noteBody: '',
        articleRef: linkData,
        getFullArticle: true
      });
      this.options.createModalModel.trigger('renderModal');
    }

  });

  return HeadlinesView;
});


