define([
  'backbone',
  'utils',
  'globalConfig',
  'jquery'
], function(Backbone, Utils, GlobalConfig, $) {
  var CreateModalModel = Backbone.Model.extend({

    defaults: {
      noteTitle: '',
      noteBody: '',
      parentNotebook: '',
      noteTags: '',
      noteComments: '',
      articleRef: {},
      article: {},
      formattedArticle: {},
      getFullArticle: false
    },

    initialize: function () {
      this.formUrl = '/api/note';
    },

    handleCreateForm: function (form) {
      var $form = $(form),
          data = this.toJSON();

      // Blur focus on button because I don't like it
      $form.find('button[type=submit]').blur();

      // Combine any comments with the note body
      var noteBody = data.noteBody;
      if (data.noteComments)  {
        var userComments = '<p>' + data.noteComments + '</p>';
        userComments = userComments.replace(/^\s*[\r\n]/gm, "</p><p>");
        noteBody += '<p style="border-top:1px solid #ccc;padding-top:10px;">User Comments:</p>';
        noteBody += userComments;
      }

      // Construct and create the note
      Utils.createNote({
        noteTitle: data.noteTitle,
        noteBody: noteBody,
        parentNotebook: {
          guid: data.parentNotebook
        },
        noteTags: data.noteTags
      });
    },

    getArticle: function () {
      var self = this,
          ref = this.get('articleRef'),
          url = GlobalConfig.baseArticleUrl + ref.contentCategoryDescriptor + ':archive/' + ref.guid + '&landingPage=article';

      this.trigger('getArticle');

      var request = $.ajax({
        url: url,
        dataType: 'jsonp'
      })
      .done(function (data) {
        if (data && data.article) {
          self.set('article', Utils.formatArticleData(data));
          self.trigger('renderArticle');
        }

        if (data.errors && data.errors.length) {
          Utils.showNotification(data.errors[0].code, data.errors[0].message, 'error');
        }
      })
      .fail(function (jqXHR, txtStatus, errorThrown) {
        Utils.showNotification(null, 'Failed to retrieve article.', 'error');
      })
      .always(function () {
        self.trigger('getArticleEnd');
      });
    }
   
  });

  return CreateModalModel;
});