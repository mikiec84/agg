requirejs.config({
    baseUrl: '',
    // urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
      'backbone': 'backbone/backbone',
      'underscore': 'underscore/underscore',
      'jquery': [
        'jquery/dist/jquery.min',
        '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
      ],
      'jquery.bs': 'bootstrap/dist/js/bootstrap.min',
      'jquery.bsValidator': 'bootstrapValidator/dist/js/bootstrapValidator.min',
      'highlightjs': 'highlightjs/highlight.pack',
      'handlebars': 'handlebars/handlebars.runtime.min',
      'nprogress': 'nprogress/nprogress',
      'moment': 'moment/min/moment.min',
      'pnotify': 'pnotify/pnotify.core',
      'pnotify.core': 'pnotify/pnotify.core',
      'pnotify.nonblock': 'pnotify/pnotify.nonblock',
      'pnotify.buttons': 'pnotify/pnotify.buttons',
      'rangy': 'rangy/rangy-core',
      'factivaCommon': '//widgets.dowjones.com/componentrendering/1.0/common',
      'templates': 'templates',
      'utils': 'js/utils',
      'globalConfig': 'js/globalConfig',
      'SearchView': 'js/views/SearchView',
      'NotebookModel': 'js/models/NotebookModel',
      'NotebookSelectorView': 'js/views/NotebookSelectorView',
      'NoteListView': 'js/views/NoteListView',
      'HeadlinesModel': 'js/models/HeadlinesModel',
      'HeadlinesView': 'js/views/HeadlinesView',
      'ArticleModel': 'js/models/ArticleModel',
      'ArticleView': 'js/views/ArticleView',
      'NoteModalView': 'js/views/NoteModalView',
      'CreateModalView': 'js/views/CreateModalView',
      'CreateModalModel': 'js/models/CreateModalModel'
    },
    shim: {
      'jquery.bs': ['jquery'],
      'jquery.bsValidator': ['jquery'],
      'highlightjs': {
        exports: 'hljs'
      },
      'templates': {
        deps: ['handlebars'],
        exports: 'Handlebars'
      },
      'pnotify': ['pnotify.core', 'pnotify.nonblock', 'pnotify.buttons'],
      'rangy': {
        exports: 'rangy',
        init: function () { return this.rangy; }
      }
    }
});