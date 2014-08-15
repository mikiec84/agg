define([
  'backbone',
  'utils',
  'globalConfig',
  'jquery',
], function(Backbone, Utils, GlobalConfig, $) {
  var ArticleModel = Backbone.Model.extend({

    defaults: {
      currentArticleRef: {},
      article: {},
      formattedArticle: {},
      articleSelection: ''
    },

    getArticle: function () {
      var self = this,
          ref = this.get('currentArticleRef'),
          url = GlobalConfig.baseArticleUrl + ref.contentCategoryDescriptor + ':archive/' + ref.guid + '&landingPage=article';

      this.trigger('getArticle');

      var request = $.ajax({
        url: url,
        dataType: 'jsonp'
      })
      .done(function (data) {
        if (data && data.article) {
          self.set('article', Utils.formatArticleData(data));
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

    // formatArticleData: function (data) {
    //   var opts = GlobalConfig.articleComponentOptions;

    //   // Format the data
    //   data.article.options = opts;
    //   data.article.languageCode = data.article.languageCode ? data.article.languageCode.toLowerCase() : 'en';
    //   data.article.hasPostProcessingOptions = opts.postProcessingOptionsWithToken && opts.postProcessingOptionsWithToken.length;
    //   data.article.renderDefaultPostProcessing = opts.showSourceLinks && (!opts.postProcessing || opts.postProcessing.toLowerCase() === "unspecified");

    //   if (data.article.publicationDate && data.article.publicationTime) {
    //     data.article.pubDateTime = new Date(data.article.publicationDate + " " + data.article.publicationTime);        
    //   } else if (data.article.publicationDate) {
    //     data.article.pubDateTime = new Date(data.article.publicationDate);        
    //   } else if (data.article.publicationTime) {
    //     data.article.pubDateTime = new Date(data.article.publicationTime);        
    //   }

    //   if ($.trim(data.article.externalUri) === "") {
    //     data.article.externalUri = false;
    //   }

    //   this.set('formattedArticle', data);
    // }
  });

  return ArticleModel;
});