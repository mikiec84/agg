define([
  'jquery',
  'pnotify',
  'globalConfig'
], function ($, PNotify, GlobalConfig) {
  var Utils = {
    // Return the document's cookies as an object of name/value pairs.
    // Assume that cookie values are encoded with encodeURIComponent().
    getCookies: function () {
      var cookies = {},
          all = document.cookie;

      if (all === "") {
        return cookies;
      }

      // Split into individual name=value pairs
      var list = all.split("; ");
      for (var i = 0; i < list.length; i++) {
        var cookie = list[i],
            p = cookie.indexOf("="),
            name = cookie.substring(0,p),
            value = cookie.substring(p+1);
        
        // Decode the value and store
        cookies[name] = decodeURIComponent(value);
      }
      return cookies;
    },

    setCookie: function (name, value, maxAge) {
      var cookies = this.getCookies(),
          defaultMaxAge = 315360000,
          cookie = name + '=' + value + ";max-age=" + (maxAge ? maxAge : defaultMaxAge);
      document.cookie = cookie;
    },

    toggleLoader: function(el, show) {
      $(el).find('.loading').toggleClass('hidden', !show);
    },

    showNotification: function (title, message, type, icon) {
      // var stack_bar_top = {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0};
      // this.notifyStack = stack_bar_top;
      var defaultNotifyOpts = {
        styling: 'bootstrap3',
        addclass: 'endemo-notification',
        type: 'notice',
        icon: true,
        animate_speed: 'normal',
        hide: true,
        delay: 3000,
        buttons: {
          closer: false,
          closer_hover: true,
          sticker: false,
          sticker_hover: true
        },
        nonblock: {
          nonblock: true,
          nonblock_opacity: .2
        }
      };

      var notifyOpts = $.extend({}, defaultNotifyOpts, {
        title: title,
        text: message,
        type: type,
        icon: icon
      });

      // make errors sticky with a close
      if (type === 'error') {
        notifyOpts.hide = false;
        notifyOpts.buttons.closer = true;
        notifyOpts.nonblock.nonblock = false;
      }
      new PNotify(notifyOpts);
    },

    formatArticleData: function (data) {
      var opts = GlobalConfig.articleComponentOptions;

      // Format the data
      data.article.options = opts;
      data.article.languageCode = data.article.languageCode ? data.article.languageCode.toLowerCase() : 'en';
      data.article.hasPostProcessingOptions = opts.postProcessingOptionsWithToken && opts.postProcessingOptionsWithToken.length;
      data.article.renderDefaultPostProcessing = opts.showSourceLinks && (!opts.postProcessing || opts.postProcessing.toLowerCase() === "unspecified");

      if (data.article.publicationDate && data.article.publicationTime) {
        data.article.pubDateTime = new Date(data.article.publicationDate + " " + data.article.publicationTime);        
      } else if (data.article.publicationDate) {
        data.article.pubDateTime = new Date(data.article.publicationDate);        
      } else if (data.article.publicationTime) {
        data.article.pubDateTime = new Date(data.article.publicationTime);        
      }

      if ($.trim(data.article.externalUri) === "") {
        data.article.externalUri = false;
      }

      return data;
    },

    formatArticleForENML: function (html) {
      //TODO: move this to server-side via enml-js or html2enml
      var $article = $(html),
          formattedArticle = {};

      formattedArticle.title = $.trim($article.find('.article-headline').text());
      // convert links
      $article.find('a').each(function (i, el) {
        var $el = $(el);
        $el.attr('href', $el.attr('data-href')).removeAttr('data-href');
      });
      // remove actions
      $article.find('.article-actions').remove();
      // strip all attributes
      $article.removeAttr('id').find('*').removeAttr('id').removeAttr('class').removeAttr('data-ref').removeAttr('data-entity');
      // convert sections to divs
      $article.find('section').each(function (i, el) {
        var $el = $(el),
            $div = $('<div/>');
        $div.html($el.html());
        $el.replaceWith($div);
      });
      formattedArticle.body = $article.html();
      formattedArticle.body = formattedArticle.body.replace(/^\s*[\r\n]/gm, "");
      return formattedArticle;
    },

    createNote: function (note) {
      var self = this;
      $.post(GlobalConfig.createNoteUrl, note)
      .done(function () {
        Utils.showNotification('Evernote', 'Your note was created successfully.', 'success');
        $(document).trigger('hideModal');
        $(document).trigger('noteCreated', note);
      })
      .fail(function(jqXHR, txtStatus, errorThrown) {
        Utils.showNotification('Evernote', 'Failed to create note.', 'error');
      });
    },
  }

  return Utils;
});