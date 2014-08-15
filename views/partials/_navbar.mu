<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">{{title}}</a>
    </div>
    <div class="navbar-collapse collapse">
    {{#user}}
      <p class="navbar-text navbar-right user-info">{{username}}<span class="social evernote"></span></p>
    {{/user}}
    {{^user}}
      <p class="navbar-text navbar-right user-info not-logged-in"><a href="/oauth">Log In</a><span class="social evernote"></span></p>
    {{/user}}
      <ul class="nav navbar-nav">
        <li class="{{#navActive.home}}active{{/navActive.home}}"><a href="/">Home</a></li>
        <li class="{{#navActive.api}}active{{/navActive.api}}"><a href="/apitest">API Test</a></li>
        <li><a href="/clear">Demo Sign Out</a></li>
      </ul>
    </div><!--/.navbar-collapse -->
  </div>
</div>