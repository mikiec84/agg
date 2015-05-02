{{#yield-styles}}
<link rel='stylesheet' href='/stylesheets/agg.css' />
{{/yield-styles}}

{{> intro}}
{{> about}}
{{> portfolio}}
{{> resume}}
{{> footer}}

{{#yield-scripts}}
  {{#isDev}}<script src="js/bundle.js"></script>{{/isDev}}
  {{^isDev}}<script src="js/bundle.min.js"></script>{{/isDev}}
{{/yield-scripts}}