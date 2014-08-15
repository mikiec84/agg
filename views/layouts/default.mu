<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
    {{{yield-styles}}}
    <script src="js/modernizr.min.js" type="text/javascript"></script>
  </head>
  <body class="{{bodyStyle}}">
    {{> navbar}}
    {{{yield}}}
    <script src="//widgets.dowjones.com/componentrendering/1.0/common.js" type="text/javascript"></script>
    <script src="requirejs/require.js"></script>
    {{{yield-scripts}}}
  </body>
</html>