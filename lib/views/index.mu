{{#yield-styles}}
<link rel='stylesheet' href='/stylesheets/agg.css' />
{{/yield-styles}}

{{> intro}}
{{> about}}
{{> portfolio}}
{{> resume}}
{{> footer}}

{{#yield-scripts}}
    <script src="js/bundle.js"></script>
{{/yield-scripts}}