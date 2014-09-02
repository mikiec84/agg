<div class="navbar navbar-fixed-top" role="navigation">
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
    <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
        {{#nav.sections}}
          <li><a href="/{{title}}">{{title}}</a></li>
        {{/nav.sections}}
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href=""><i class="fa fa-envelope"></i></a></li>
        <li><a href=""><i class="fa fa-file-text"></i></a></li>
        <li><a href=""><i class="fa fa-twitter"></i></a></li>
        <li><a href=""><i class="fa fa-linkedin"></i></a></li>
      </ul>
    </nav>
  </div>
</div>