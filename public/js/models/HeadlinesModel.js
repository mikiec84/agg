define([
  'backbone',
  'utils',
  'jquery'
], function(Backbone, Utils, $) {
  var HeadlinesModel = Backbone.Model.extend({

    defaults: {
      searchTerm: '',
      headlines: {}
    },

    getHeadlines: function () {
      var self = this,
          topic = this.get('searchTerm');
      
      // Tell the view what's going on so it can update
      this.trigger('getHeadlines');

      $.ajax({
        url: 'http://agave.dev.dowjones.com/ProjectMurdoch/api/getDataByConcept?snippettype=fixed',
        dataType: 'jsonp',
        data: {concept:topic}
      })
      .done(function (data, txtStatus, jqXHR) {
        if (data.errors) {
          Utils.showNotification('Headlines', data.errors[1].message, 'error');
        } else {
          self.set('headlines', data);
        }
      })
      .fail(function(jqXHR, txtStatus, errorThrown) {
        Utils.showNotification("Headlines", 'There was an error retrieving headlines.', 'error');
      })
      .always(function () {
        self.trigger('getHeadlinesEnd');
      });
    }
    
  });

  return HeadlinesModel;
});