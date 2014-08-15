<ul class="list-unstyled">
  {{^isSelection}}
  <li><a class="btn btn-link en-note-save-link"
    data-an="{{reference.guid}}"
    data-content-category="{{reference.contentCategoryDescriptor}}"
    data-source="{{sourceDescriptor}}"
    data-title="{{title}}"
    data-snippets="{{snippets}}"
    data-mod-date="{{modificationDateTimeDescriptor}}"><i class="fa fa-link"></i>New Note with Article Link</a></li>
  <li><a class="btn btn-link en-note-save-full" data-title="{{title}}" data-guid="{{reference.guid}}" data-content-category-descriptor="{{reference.contentCategoryDescriptor}}"
><i class="fa fa-file-text-o"></i>New Note with Full Article</a></li>
{{/isSelection}}
{{#isSelection}}
<li><a class="btn btn-link en-note-save-selection"><i class="fa fa-file-text-o"></i>New Note from Selection</a></li>
{{/isSelection}}
</ul>