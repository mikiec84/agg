/*global requirejs */
requirejs.config({
  baseUrl: '',
  urlArgs: 'bust=' +  (new Date()).getTime(),
  paths: {
    'backbone': 'backbone/backbone',
    'underscore': 'underscore/underscore',
    'jquery': [
      'jquery/dist/jquery.min',
      '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
    ],
    'jquery.bs': 'bootstrap/dist/js/bootstrap.min',
    'handlebars': 'handlebars/handlebars.runtime.min',
    'templates': 'templates',
    'moment': 'moment/min/moment.min',
    'utils': 'js/utils',
    'slick': 'slick.js/slick/slick.min'
  },
  shim: {
    'jquery.bs': ['jquery'],
    'templates': ['handlebars']
  }
});