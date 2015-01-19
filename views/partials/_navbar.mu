<div class="navbar navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">{{title}}</a>
    </div>
    <nav class="" role="navigation">
      <ul class="nav navbar-nav main-nav hidden-xs">
        {{#nav.sections}}
          <li><a href="{{href}}">{{title}}</a></li>
        {{/nav.sections}}
      </ul>
      <ul class="nav navbar-nav navbar-right secondary-nav">
        <li class="ext-link"><a href="//github.com/adamgruber" target="_blank"><i class="fa fa-2x fa-github-square"></i></a></li>
        <li class="ext-link"><a href="//twitter.com/talknmime" target="_blank"><i class="fa fa-2x fa-twitter-square"></i></a></li>
        <li class="ext-link"><a href="//linkedin.com/pub/adam-gruber/35/60a/4b2" target="_blank"><i class="fa fa-2x fa-linkedin-square"></i></a></li>
        <li class="ext-link hidden"><a href=""><i class="fa fa-2x fa-envelope-square"></i></a></li>
      </ul>
    </nav>
  </div>
</div>