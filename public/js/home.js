define([
  'templates',
  'nprogress',
  'moment',
  'utils',
  'jquery',
  'jquery.bs',
  'jquery.typeahead'
], function(Handlebars, NProgress, Moment, Utils, $) {

  var agg = function () {
    // DJ.config.debug = true;

    // $(document)
    // .ajaxStart(function() {
    //   NProgress.start();
    // })
    // .ajaxStop(function() {
    //   NProgress.done();
    // });

    // Selectors

    // Init Things
    this.initHandlebarsHelpers();

    // this.initTypeahead();

    // Create Model/View Instances
    
  };

  agg.prototype.initTypeahead = function () {

    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
          }
        });

        cb(matches);
      };
    };

    var sections = ['About', 'Resume', 'Contact', 'Work'];

    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'agg',
      displayKey: 'value',
      source: substringMatcher(sections)
    });
  };

  agg.prototype.initHandlebarsHelpers = function () {
    Handlebars.registerHelper('dateFormat', function(context, format) {
      if (format === "fromNow") {
        return Moment(context).fromNow();
      } else {
        return Moment(context).format(format);
      }
    });
  };

  return agg;
});