<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Adam Gruber, a developer with an extensive background in design and a passion for great creative and clean semantic code.">
    <meta name="keywords" content="HTML, CSS, JS, JavaScript, front-end, frontend, web development">
    <meta name="author" content="Adam Gruber">
    <link rel="shortcut icon" href="/favicon.ico" />
    <title>{{title}}</title>
    {{{yield-styles}}}
    <script src="js/modernizr.min.js" type="text/javascript"></script>
  </head>
  <body class="{{bodyStyle}}">
    {{> navbar}}
    {{{yield}}}
    <script src="requirejs/require.js"></script>
    {{{yield-scripts}}}
  </body>
</html>