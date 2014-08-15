<ul class="article-list list-unstyled">
{{#.}}
<li class="headline dj_entry" data-ref="{{reference.guid}}">
    <a class="article-view-trigger clearfix" href="javascript:void(0);">
      <h4 class="headline-title">{{truncatedTitle}}</h4>
      <p class="headline-meta source">{{sourceDescriptor}}</p>
      <p class="headline-meta date">{{dateFormat modificationDateTime 'MMMM Do YYYY, h:mm a'}}</p>
    </a>
    <button class="btn btn-sm btn-link en-save"><span class="social evernote"></span></button>
  </li>
{{/.}}
</ul>