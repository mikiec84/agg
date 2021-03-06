<article class="project">
  <div class="row">
    <div class="project-images-cnt">
      {{#images}}
      <div class="project-image"><img class="img-responsive" src="/images/portfolio/{{.}}" /></div>
      {{/images}}
    </div>
    <div class="project-info-cnt">  
      <h3 class="project-name">{{projectName}}{{#link}}<a href="{{url}}" class="btn btn-default" target="_blank">{{#icon}}<i class="{{class}}"></i> {{/icon}}{{title}}</a>{{/link}}</h3>
      <p class="lead">{{summary}}</p>
      {{#description}}
        <p class="description">{{.}}</p>
      {{/description}}
      <ul class="list-unstyled features">
        {{#features}}
          <li class="feature">{{.}}</li>
        {{/features}}
      </ul>
    </div>
  </div>
</article>