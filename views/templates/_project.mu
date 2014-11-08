<article class="project">
  <div class="row">
    <div class="project-image-cnt">
      <img class="img-responsive" src="/images/portfolio/{{imageUrl}}" />
    </div>
    <div class="project-info-cnt">  
      <h3>{{projectName}}</h3>
      <p class="summary">{{summary}}</p>
      {{#description}}
        <p class="description">{{.}}</p>
      {{/description}}
      <ul class="features">
        {{#features}}
          <li class="feature">{{.}}</li>
        {{/features}}
      </ul>
    </div>
  </div>
</article>