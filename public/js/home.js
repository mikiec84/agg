define([
  'templates',
  'nprogress',
  'moment',
  'utils',
  'ArticleModel',
  'CreateModalModel',
  'HeadlinesModel',
  'NotebookModel',
  'ArticleView',
  'CreateModalView',
  'HeadlinesView',
  'NotebookSelectorView',
  'NoteListView',
  'NoteModalView',
  'SearchView',
  'jquery',
  'jquery.bs'
], function(Handlebars, NProgress, Moment, Utils,
            ArticleModel, CreateModalModel, HeadlinesModel, NotebookModel,
            ArticleView, CreateModalView, HeadlinesView, NotebookSelectorView, NoteListView, NoteModalView, SearchView, $) {

  var ENDemo = function () {
    // DJ.config.debug = true;

    $(document)
    .ajaxStart(function() {
      NProgress.start();
    })
    .ajaxStop(function() {
      NProgress.done();
    });

    this.siteCookies = Utils.getCookies();

    // Selectors
    this.$notesForm = $('#en-notes');
    this.$notesFormSelect = this.$notesForm.find('select');
    this.$headlinesPanel = $('.panel-headlines');
    this.$articlePanel = $('.panel-article');
    this.$currentNotesSection = $('.en-notes-current');
    this.$relatedNotesSection = $('.en-notes-related');

    // Init Things
    this.initHandlebarsHelpers();
    this.initEvents();

    // Create Model/View Instances
    this.headlinesModel = new HeadlinesModel();
    this.articleModel = new ArticleModel();
    this.createModalModel = new CreateModalModel();
    this.notebookModel = new NotebookModel({
      currentNotebookGUID: this.$notesFormSelect.val(),
      notebooks: this.$notesFormSelect.data('notebooks')
    });
    
    this.searchView = new SearchView({
      el: '#autoSuggestContainer',
      model: this.headlinesModel
    }, {main: this});

    this.notebookSelectorView = new NotebookSelectorView({
      el: this.$notesFormSelect,
      model: this.notebookModel
    });

    this.myNoteListView = new NoteListView({
      el: this.$currentNotesSection,
      model: this.notebookModel
    });

    this.RelatedNoteListView = new NoteListView({
      el: this.$relatedNotesSection,
      model: this.notebookModel
    }, {
      articleModel: this.articleModel
    });

    this.headlinesView = new HeadlinesView({
      el: this.$headlinesPanel,
      model: this.headlinesModel,
    }, {
      articleModel: this.articleModel,
      createModalModel: this.createModalModel
    });

    this.articleView = new ArticleView({
      el: this.$articlePanel,
      model: this.articleModel
    }, {
      createModalModel: this.createModalModel
    });

    this.noteModalView = new NoteModalView({
      model: this.notebookModel
    });

    this.createModalView = new CreateModalView({
      model: this.createModalModel
    },
    {
      articleView: this.articleView,
      articleModel: this.articleModel,
      notebookModel: this.notebookModel
    });

  };

  $.extend(ENDemo.prototype, {

    initHandlebarsHelpers: function () {
      Handlebars.registerHelper('dateFormat', function(context, format) {
        if (format === "fromNow") {
          return Moment(context).fromNow();
        } else {
          return Moment(context).format(format);
        }
      });
    },

    initEvents: function () {
      var self = this;
      
      // Hide popovers when clicking away
      $(document).on('mouseup hidePopovers', function (e) {
        var $popovers = $('.popover-showing');
        if ($popovers.length) {
          $popovers.popover('destroy').removeClass('popover-showing');
        }
      });
    }

  });

  return ENDemo;
});