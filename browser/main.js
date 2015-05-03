/*global window, $*/
'use strict';
window.jQuery = window.$ = require('jquery');
var Backbone = require('backbone'),
    AppView = require('./views/AppView');

Backbone.$ = window.$;

new AppView({
  el: $('html')
});