{{#yield-styles}}
<link rel='stylesheet' href='/stylesheets/agg.css' />
{{/yield-styles}}

<div class="container-fluid">
  {{> searchNav}}
  {{> home}}
</div>

{{#yield-scripts}}
  <!--<script src="/templates.js"></script>-->
  <script>
    require(['js/common'], function (common) {
      require(['js/home'], function (ENDemo) {
        new ENDemo();
      });
    });
  </script>
{{/yield-scripts}}