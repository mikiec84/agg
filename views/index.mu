{{#yield-styles}}
<link rel='stylesheet' href='/stylesheets/djevernote.css' />
{{/yield-styles}}

{{#session.error}}
  <h2>Error</h2>
  <p>{{session.error}}</p>
{{/session.error}}

{{^session.oauthAccessToken}}
  {{> login}}
{{/session.oauthAccessToken}}

{{#session.oauthAccessToken}}
  {{> home}}
{{/session.oauthAccessToken}}

{{#yield-scripts}}
  <!--<script src="/templates.js"></script>-->
  <script>
    require(['js/common'], function (common) {
      {{^session.oauthAccessToken}}
        require(['js/login']);
      {{/session.oauthAccessToken}}
      {{#session.oauthAccessToken}}
        require(['js/home'], function (ENDemo) {
          new ENDemo();
        });
      {{/session.oauthAccessToken}}
    });
  </script>
{{/yield-scripts}}