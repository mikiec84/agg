{{#yield-styles}}
<link rel='stylesheet' href='/stylesheets/agg.css' />
{{/yield-styles}}

{{> intro}}
{{> about}}
{{> portfolio}}
{{> resume}}

{{#yield-scripts}}
  <script>
    require(['js/common'], function (common) {
      require(['js/home'], function (App) {
        new App();
      });
    });
  </script>
{{/yield-scripts}}