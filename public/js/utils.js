/*global document*/
define([
  'jquery',
  'pnotify'
], function ($, PNotify) {
  'use strict';
  var Utils = {
    // Return the document's cookies as an object of name/value pairs.
    // Assume that cookie values are encoded with encodeURIComponent().
    getCookies: function () {
      var cookies = {},
          all = document.cookie;

      if (all === '') {
        return cookies;
      }

      // Split into individual name=value pairs
      var list = all.split('; ');
      for (var i = 0; i < list.length; i++) {
        var cookie = list[i],
            p = cookie.indexOf('='),
            name = cookie.substring(0,p),
            value = cookie.substring(p+1);
        
        // Decode the value and store
        cookies[name] = decodeURIComponent(value);
      }
      return cookies;
    },

    setCookie: function (name, value, maxAge) {
      var defaultMaxAge = 315360000,
          cookie = name + '=' + value + ';max-age=' + (maxAge ? maxAge : defaultMaxAge);
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
          nonblock_opacity: 0.2
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
    }

  };

  return Utils;
});