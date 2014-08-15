define([
  'highlightjs',
  'utils',
  'jquery',
  'jquery.bs',
  'jquery.bsValidator'
], function(hljs, Utils, $) {
  
  var APITest = function () {
    // TODO: use Utils.getCookies();
    // TODO: add a util for setCookies();
    this.themeCookie = this.getThemeCookie();
    
    this.$themeLabel = $('.theme-selector label');
    this.$themeBtns = $('input[name=outputTheme]');
    this.$response = $('.response-output');
    this.$themeStyle = $('#response-output-theme');

    this.initTheme();
    this.initFormValidation();
    this.initEvents();
  };

  $.extend(APITest.prototype, {

    initTheme: function () {
      // Check for theme cookie, set button properly
      if (this.themeCookie) {
        this.changeOutputTheme(this.themeCookie);
        // set button
        this.$themeLabel.removeClass('active');
        this.$themeBtns.filter('[value=' + this.themeCookie + ']').parent('label').addClass('active');
      }
    },

    initFormValidation: function () {
      var self = this;
      // Init validator for all forms
      $('form').bootstrapValidator({
          excluded: [],
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          message: 'Field is required.',
          submitHandler: function(validator, form, submitButton) {
            self.handleForm(form);
          }
      });
    },

    initEvents: function () {
      var self = this;
      // Handle Theme Switching
      this.$themeBtns.on('change', function (e) {
        var theme = $(e.currentTarget).val();
        self.changeOutputTheme(theme);
      });

      // Get Note Include Content
      $('#get-note').on('change', '[value=withContent]', function (e) {
        if ($(e.currentTarget).is(':checked')) {
          $('[value=withResourcesData]').removeAttr('disabled').parent('label').removeClass('disabled');
        } else {
          $('[value=withResourcesData]').attr('disabled', '').parent('label').addClass('disabled');
        }
      })
    },

    handleForm: function(form) {
      var $form = form;
          method = $form.attr('method'),
          url = $form.attr('action'),
          formData = $form.serializeArray(),
          data = {};

      // Blur focus on button because I don't like it
      $form.find('button[type=submit]').blur();

      // Turn form data into data object
      $.each(formData, function(i, val) {
        // strip blank lines from related query
        if (val.name === 'relatedQuery') {
          val.value = val.value.replace(/^\s*[\r\n]/gm, "");
        }
        data[val.name] = val.value;
      });

      // Find any checkboxes and note their states
      var $checks = $form.find('input[type=checkbox]');
      if ($checks.length) {
        $checks.each(function(i, val) {
          $check = $(val);
          data[$check.val()] = $check.is(':disabled') ? false : $check.prop('checked');
        });
      }

      if (url.indexOf(':guid') != -1) {
        // add guid to url
        url = url.replace(':guid', data.guid);
        delete data.guid; // we don't need it anymore
      }

      // Pass a reference to the form so it can be reset after ajax call
      this.ajaxCall($form, method, url, data);
    },

    ajaxCall: function($form, method, url, data) {
      var self = this;

      $.ajax({
        url: url,
        type: method,
        data: data
      })
      .done(function (data, textStatus, jqXHR) {
        if (data) {

          if (data === 'OK') {
            self.$response.html('<em>Your note was successfully moved to the trash.</em>');
            return;
          }

          var ct = jqXHR.getResponseHeader("content-type") || "";
          if (ct.indexOf('html') > -1) {
            // handle html response
            self.$response.html(data.note);
          }
          if (ct.indexOf('json') > -1) {
            // handle json response

            // hashes take too long to render so ignore them
            if (data.contentHash) {
              data.contentHash = {};
            }
            if (data.notes && data.notes.length) {
              for (var i=0; i < data.notes.length; i++) {
                data.notes[i].contentHash = {};
              }
            }

            // if we got a note
            if (data.note) {
              var enContent = data.content;
              data = data.note;

              if (data.contentHash) {
                data.contentHash = {};
              }
              if (data.resources && data.resources.length) {
                for (var i=0; i < data.resources.length; i++) {
                  if (data.resources[i].data) {
                    data.resources[i].data.bodyHash = {};
                    data.resources[i].data._body = {};
                  }
                  if (data.resources[i].recognition) {
                    data.resources[i].recognition.bodyHash = {};
                  }
                }
              }
              // strip note content from json object
              delete data.content;
            }

            // stringify for display
            data = JSON.stringify(data, undefined, 2);
            var $jsonResponse = $('<pre><code></code></pre>');
            $jsonResponse.find('code').html(data).each(function(i, e) {
              hljs.highlightBlock(e);
            });
            self.$response.html($jsonResponse);

            // if note content exists, display above json output
            if (enContent) {
              var $enContent = $('<div class="en-content" />');
              $enContent.append(enContent);
              self.$response.find('pre').before($enContent);
            }
          } 
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        var statusCode = jqXHR.status;
        var $errorAction;
        switch (statusCode) {
          case 401: {
            $errorAction = $('<div><a href="/oauth">Log in to Evernote</a></div>');
            break;
          }
        }
        var $errorOutput = $('<div class="response-error"><em>' + textStatus.toUpperCase() + ' ' + statusCode + ': ' + jqXHR.responseText + '</em></div>');
        $errorOutput.append($errorAction);
        self.$response.html($errorOutput);
      })
      .always(function () {
        $form.data('bootstrapValidator').resetForm();
      });
    },

    changeOutputTheme: function(theme) {
      this.$themeStyle.attr('href', '/highlightjs/styles/' + theme + '.css');
      this.setThemeCookie(theme);
    },

    setThemeCookie: function(theme) {
      // Set theme cookie if not set or different from current theme
      var themeCookie = this.getThemeCookie();
      if (!themeCookie || themeCookie != theme) {
        Utils.setCookie('outputTheme', theme);
      }
    },

    getThemeCookie: function () {
      var cookies = Utils.getCookies();
      this.themeCookie = cookies['outputTheme'];
      return this.themeCookie;
    }
  });

  return APITest;

});
