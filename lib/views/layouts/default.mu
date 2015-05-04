<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Adam Gruber, a developer with an extensive background in design and a passion for great creative and clean semantic code.">
    <meta name="keywords" content="HTML, CSS, JS, JavaScript, front-end, frontend, web development">
    <meta name="author" content="Adam Gruber">
    <title>{{title}}</title>
    {{{yield-styles}}}
    <script src="js/modernizr.min.js" type="text/javascript"></script>
  </head>
  <body class="{{bodyStyle}}">
    {{> navbar}}
    {{{yield}}}
    {{{yield-scripts}}}
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-31876357-1', 'auto');
      ga('require', 'linkid', 'linkid.js');
      ga('send', 'pageview');
    </script>
  </body>
</html>