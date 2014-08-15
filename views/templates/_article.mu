{{#article}}

<div class="article article-display-{{options.articleDisplayOptions}} article-lang-{{languageCode}}" data-ref="{{{reference}}}">
  <section class="article-header">
    {{#hasPostProcessingOptions}}
    <div class="btn-group btn-group-xs article-actions">
    {{/hasPostProcessingOptions}}
      {{#options.postProcessingOptionsWithToken}}
        {{#.}}
        <button type="button" class="btn btn-default {{option}}">{{token}}</button>
        {{/.}}
      {{/options.postProcessingOptionsWithToken}}
    {{#hasPostProcessingOptions}}
    </div>
    {{/hasPostProcessingOptions}}

    <h2 class="article-headline">
      {{#headlines}}
        {{text}}
      {{/headlines}}
    </h2>

    <div class="article-meta-author">
      {{#authors}}
        <span class="article-meta article-author" data-entity="{{{entityData}}}">{{entityName}}</span>
      {{/authors}}
    </div>

    <div class="article-meta-source">
      {{#renderDefaultPostProcessing}}
        {{#sources}}
          {{#isEntityLink}}
            <span class="article-meta article-source" data-entity="{{{entityData}}}">{{entityName}}</span>
          {{/isEntityLink}}
          {{^isEntityLink}}
            {{text}}
          {{/isEntityLink}}
        {{/sources}}
      {{/renderDefaultPostProcessing}}

      {{#sourceName}}
        <span class="article-meta article-source">{{sourceName}}</span>
      {{/sourceName}}
      
      <span class="article-meta article-pub-date">{{dateFormat pubDateTime 'dddd, MMMM D YYYY, hh:mma'}}</span>
    </div>
    
  </section>
  
  <section class="article-body">
  
    {{{articleBody}}}
  
    {{#externalUri}}
    <div class="dj_article_lp dj_article_section">
      <p class="dj_article_paragraph">
        <span class="dj_article_plain">
          <a class="dj_article_weblink" href="{{externalUri}}" target="_blank">Click here to continue reading this article in an external site.</a>
        </span>
      </p>
    </div>
    {{/externalUri}}
</section>
{{/article}}