{{#article}}
  <h2>
    {{#headlines}}
      {{text}}
    {{/headlines}}
  </h2>
  <div>
    {{#authors}}
      <div>{{entityName}}</div>
    {{/authors}}
  </div>
  <div>
    {{#renderDefaultPostProcessing}}
      {{#sources}}
        {{#isEntityLink}}
          <div>{{entityName}}</div>
        {{/isEntityLink}}
        {{^isEntityLink}}
          {{text}}
        {{/isEntityLink}}
      {{/sources}}
    {{/renderDefaultPostProcessing}}
    {{#sourceName}}
      <div>{{sourceName}}</div>
    {{/sourceName}}
    <div>{{dateFormat pubDateTime 'dddd, MMMM D YYYY, hh:mma'}}</div>
  </div>
{{/article}}
  <div>---</div>
  <div>{{{selection}}}</div>
  <div>---</div>