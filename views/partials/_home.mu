<div class="endemo-home container-fluid">
  <div class="row search-row">
    <div class="col-sm-6 col-sm-offset-3">
      <!-- Search -->
      <div id="autoSuggestContainer" class="input-group">
        <input class="form-control" id="djKeywordAutoSuggest" autocomplete="off" type="text" placeholder="Find a topic">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button" id="search-btn">Search</button>
        </span>
      </div>
    </div>
  </div>
  <div class="row content-row">
    <!-- Headlines -->
    <div class="col-sm-4">
      <div class="panel panel-default panel-headlines">
        <div class="panel-heading">
          <h4 class="panel-title">Headlines</h4>
        </div>
        <div class="panel-body">
          <div class="pagination-controls">
            <a class="btn btn-link pull-left prev hidden"><i class="fa fa-chevron-left"></i> Previous</a>
{{!             <div class="page-indicators">
              <ul class="list-inline">
                <li><i class="fa fa-circle-thin"></i></li>
                <li><i class="fa fa-circle-thin"></i></li>
                <li><i class="fa fa-circle-thin"></i></li>
                <li><i class="fa fa-circle-thin"></i></li>
                <li><i class="fa fa-circle-thin"></i></li>
              </ul>
            </div>
 }}            <a class="btn btn-link pull-right next hidden">Next <i class="fa fa-chevron-right"></i></a>
          </div>
          <div class="loading hidden"><span class="spinner"></span></div>
          <div id="headlines-cont" class="headlines hidden"></div>
        </div>  
      </div>
    </div>
    <div class="col-sm-5">
      <div class="panel panel-default panel-article">
        <div class="panel-heading">
          <h4 class="panel-title">Article</h4>
        </div>
        <div class="panel-body">
          <div class="loading hidden"><span class="spinner"></span></div>
          <div id="article-cont">
          </div>
        </div>  
      </div>
    </div>
    <div class="col-sm-3">
      <div class="panel panel-default panel-evernote">
        <div class="panel-heading">
          <h4 class="panel-title">Evernote Info</h4>
        </div>
        <div class="panel-body">
          <section class="panel-body-section">
            <h4>Current Notebook</h4>
            <form id="en-notes">
              <select class="form-control input-sm" data-notebooks="{{notebooksStr}}">
                {{#notebooks}}
                  <option value="{{guid}}"{{#isSelected}} selected{{/isSelected}}>{{name}}</option>
                {{/notebooks}}
              </select>
            </form>
          </section>
          <section class="panel-body-section en-notes-current">
            <div class="en-note-list-header">
              <h4 class="pull-left" data-toggle="collapse" data-target="#myNotes">My Notes</h4>
              <button class="btn btn-link pull-right refresh-note-list disabled"><span class="glyphicon glyphicon-refresh"><span></button>
            </div>
            <div class="collapse in" id="myNotes">
              <div class="loading hidden"><span class="spinner"></span></div>
              <ul class="list-unstyled en-notes-list notes-current"></ul>
            </div>
          </section>
          <section class="panel-body-section en-notes-related">
            <div class="en-note-list-header">
              <h4 class="pull-left" data-toggle="collapse" data-target="#relatedNotes">Related Notes</h4>
              <button class="btn btn-link pull-right refresh-note-list hidden"><span class="glyphicon glyphicon-refresh"><span></button>
            </div>
            <div class="collapse in" id="relatedNotes">
              <div class="loading hidden"><span class="spinner"></span></div>
              <ul class="list-unstyled en-notes-list notes-related">
                <li class="en-no-data">Load an Article to See Related Notes</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>