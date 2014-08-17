define([
  'templates',
  'nprogress',
  'moment',
  'utils',
  'jquery',
  'jquery.bs'
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

    // Create Model/View Instances
    
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