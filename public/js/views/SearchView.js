define([
  'backbone',
  'jquery'
], function(Backbone, $) {
  var SearchView = Backbone.View.extend({

    events: {
      'click #search-btn':            'onSearchClick',
      'keyup #djKeywordAutoSuggest':  'onSearchKeyup'
    },

    initialize: function (options, opts) {
      this.initSearch();
      this.listenTo(this.model, 'getHeadlinesEnd', this.onGetHeadlinesEnd.bind(this));
    },

    onSearchClick: function (e) {
      var topic = $.trim(this.$autoSuggest.val());
      if (topic != "") {
        // this.model.unset('searchTerm', {silent: true});
        this.model.set("searchTerm", topic);
        this.model.getHeadlines();
      }
      $(e.currentTarget).blur();
    },

    onSearchKeyup: function (e) {
      var topic = $.trim(this.$autoSuggest.val());
      if ((e.keyCode == 13 || e.which == 13) && topic !== "" ) {
        // this.model.unset('searchTerm', {silent: true});
        this.model.set("searchTerm", topic);
        this.model.getHeadlines();
        this.$el.blur();
      }
    },

    onSearchItemSelect: function (data) {
      this.model.set("searchTerm", data.word);
      this.model.getHeadlines();
    },

    onGetHeadlinesEnd: function () {
      this.$el.blur();
    },

    initSearch: function () {
      var self = this,
          encryptedtoken = "S00ZWrd2tNr2sVo5DEs5DEpNDanMTEsM97yMHn0VtJaMdRO29JpVczBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQQAA",
          responseformat = "json",
          componentInstance;
      
      $.ajax({
        url:  "http://suggest.factiva.com/authenticate/1.0/registerUsingEncryptedKey",
        dataType: 'jsonp',
        data: {
          eid: encryptedtoken,
          format: responseformat
        },
        timeout: 3000,
        success: function (response) {
          DJ.add("AutoSuggest", {
            container: self.$el,
            options: {
              url: 'http://suggest.factiva.com/Search/1.0',
              controlId: "djKeywordAutoSuggest",
              autocompletionType: "keyword",
              authType: "SuggestContext",
              authTypeValue: response.key,
              onItemSelect: function (data) {
                self.onSearchItemSelect(data);
              },
              fillInputOnKeyUpDown: "true",
              selectFirst: false
            },
            templates: {
              success: function() {
                var html = '<input class="dj_AutoSuggest form-control" id="djKeywordAutoSuggest" autocomplete="off" type="text" placeholder="Find a topic">';
                html += '<span class="input-group-btn"><button class="btn btn-primary" type="button" id="search-btn">Search</button></span>';
                return html;
              }
            }
          })
          .done(function (comp) {
            self.$autoSuggest = self.$el.find('#djKeywordAutoSuggest');
          });
        },
        error: function (jqXHR, txtStatus, errorThrown) {
          // self.showNotification(null, 'There was an error initializing the search.', 'error');
        }
      });
    }

  });

  return SearchView;
});