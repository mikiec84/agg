{{#yield-styles}}
<link rel='stylesheet' href='/stylesheets/djevernote.css' />
<link rel='stylesheet' href='/highlightjs/styles/github.css' id='response-output-theme' />
<link rel="stylesheet" href="/bootstrapValidator/dist/css/bootstrapValidator.min.css"/>
{{/yield-styles}}

<div class="apitest-wrap container-fluid">
  <div class="row">
    <div class="col-sm-5">
      <div class="panel-group api-forms" id="accordion">

        <!-- Get Notebooks -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title api-path">
              <a data-toggle="collapse" data-parent="#accordion" href="#form-list-all">
              Get all notebooks for user
              </a>
            </h4>
          </div>
          <div id="form-list-all" class="panel-collapse collapse in">
            <form role="form" class="panel-body" id="list-all" method="get" action="/api/notebooks">
              <h5>/api/notebooks <span class="label label-info">GET</span></h5>
              <button type="submit" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-book"></span> List All Notebooks</button>
            </form>
          </div>
        </div>

        <!-- Get All Notes in Notebook -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title api-path">
              <a data-toggle="collapse" data-parent="#accordion" href="#form-get-notes">
              Get all notes for a specific notebook
              </a>
            </h4>
          </div>
          <div id="form-get-notes" class="panel-collapse collapse">
            <form role="form" class="panel-body" id="get-notes" method="get" action="/api/notes/:guid">
              <h5>/api/notes/:guid <span class="label label-info">GET</span></h5>
              <div class="form-group">
                <label for="notebookGUID">Notebook GUID</label>
                <input type="text" class="form-control input-sm" name="guid" id="notebookGUID" placeholder="Enter Notebook GUID" data-bv-notempty data-bv-uuid data-bv-uuid-message="Enter a valid GUID" data-bv-uuid-version="all">
              </div>
              <div class="form-group row">
                <div class="col-sm-6">
                  <select name="order" class="form-control input-sm">
                    <option value="1">Created</option>
                    <option value="2">Updated</option>
                    <option value="3">Relevance</option>
                    <option value="4">Update Sequence Number</option>
                    <option value="5">Title</option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <select name="ascending" class="form-control input-sm">
                    <option value="true">Ascending</option>
                    <option value="false">Descending</option>
                  </select>
                </div>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="showTrash">
                  Show notes in the trash
                </label>
              </div>
              <button type="submit" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-list-alt"></span> Get All Notes for Notebook</button>
            </form>
          </div>
        </div>

        <!-- Get Note -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title api-path">
              <a data-toggle="collapse" data-parent="#accordion" href="#form-get-note">Get a note by ID
              </a>
            </h4>
          </div>
          <div id="form-get-note" class="panel-collapse collapse">
            <form role="form" class="panel-body" id="get-note" method="get" action="/api/note/:guid">
              <h5>/api/note/:guid <span class="label label-info">GET</span></h5>
              <div class="form-group">
                <label for="noteGUID">Note GUID</label>
                <input type="text" class="form-control input-sm" id="noteGUID" name="guid" placeholder="Enter Note GUID" data-bv-notempty data-bv-uuid data-bv-uuid-message="Enter a valid GUID" data-bv-uuid-version="4">
              </div>
              <div class="form-group">
                <label class="checkbox-inline">
                  <input type="checkbox" value="withContent" checked>
                  Include Content
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="withResourcesData">
                  Include Resources
                </label>
              </div>
{{!               <div class="form-group">
                <label class="checkbox-inline">
                  <input type="checkbox" value="withResourcesRecognition">
                  Include Recognition
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="withResourcesAlternateData">
                  Include Alternate Data
                </label>
              </div>
 }}              <button type="submit" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-list-alt"></span> Get Note</button>
            </form>
          </div>
        </div>

        <!-- Create Note -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title api-path">
              <a data-toggle="collapse" data-parent="#accordion" href="#form-create-note">
              Create a new note
              </a>
            </h4>
          </div>
          <div id="form-create-note" class="panel-collapse collapse">
            <form role="form" class="panel-body" id="create-note" method="post" action="/api/note">
              <h5>/api/note <span class="label label-info">POST</span></h5>
              <div class="form-group">
                <label for="noteTitle">Note Title</label>
                <input type="text" class="form-control input-sm" id="noteTitle" name="noteTitle" placeholder="Enter Note Title" data-bv-notempty data-bv-notempty-message="You must give your note a title.">
              </div>
              <div class="form-group">
                <label for="noteBody">Note Content</label>
                <textarea class="form-control input-sm" id="noteBody" rows="3" name="noteBody" placeholder="Enter Note Content" data-bv-notempty data-bv-notempty-message="Your note content cannot be empty."></textarea>
              </div>
              <div class="form-group optional">
                <label for="noteTags">Note Tags</label>
                <input type="text" class="form-control input-sm" id="noteTags" name="noteTags" placeholder="Enter Note Tags">
              </div>
              <div class="form-group optional">
                <label for="noteParent">Parent Notebook</label>
                <input type="text" class="form-control input-sm" id="noteParent" name="guid" placeholder="Enter Notebook GUID" data-bv-uuid data-bv-uuid-message="Enter a valid GUID" data-bv-uuid-version="4">
              </div>
              <button type="submit" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-plus"></span> Create Note</button>
            </form>
          </div>
        </div>

        <!-- Update Note -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title api-path">
              <a data-toggle="collapse" data-parent="#accordion" href="#form-update-note">
              Update an existing note
              </a>
            </h4>
          </div>
          <div id="form-update-note" class="panel-collapse collapse">
            <form role="form" class="panel-body" id="update-note" method="post" action="/api/note/:guid">
              <h5>/api/note/:guid <span class="label label-info">POST</span></h5>
              <div class="form-group">
                <label for="noteTitle">Note Title</label>
                <input type="text" class="form-control input-sm" id="noteTitle" name="noteTitle" placeholder="Enter Note Title" data-bv-notempty data-bv-notempty-message="You must give your note a title.">
              </div>
              <div class="form-group optional">
                <label for="noteBody">Note Content</label>
                <textarea class="form-control input-sm" id="noteBody" rows="3" name="noteBody" placeholder="Enter Note Content"></textarea>
              </div>
              <div class="form-group optional">
                <label for="noteTags">Note Tags</label>
                <input type="text" class="form-control input-sm" id="noteTags" name="noteTags" placeholder="Enter Note Tags">
              </div>
              <div class="form-group">
                <label for="noteGUID">Note GUID</label>
                <input type="text" class="form-control input-sm" id="noteGUID" name="guid" placeholder="Enter Note GUID" data-bv-notempty data-bv-notempty-message= "You must provide the GUID of a note to update." data-bv-uuid data-bv-uuid-message="Enter a valid GUID" data-bv-uuid-version="4">
              </div>
              <button type="submit" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-refresh"></span> Update Note</button>
            </form>
          </div>
        </div>

        <!-- Find Related -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title api-path">
              <a data-toggle="collapse" data-parent="#accordion" href="#form-find-related">
              Find related items
              </a>
            </h4>
          </div>
          <div id="form-find-related" class="panel-collapse collapse">
            <form role="form" class="panel-body" id="update-note" method="post" action="/api/related">
              <h5>/api/related <span class="label label-info">POST</span></h5>
              <div class="form-group">
                <label for="relatedQuery">Query</label>
                <textarea class="form-control input-sm" id="relatedQuery" rows="3" name="relatedQuery" placeholder="Enter some text" maxlength="131072" data-bv-notempty data-bv-notempty-message="You must provide a query."></textarea>
              </div>
              <div class="form-group">
                <label class="checkbox-inline">
                  <input type="checkbox" value="includeNotes" checked>
                  Notes
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="includeNotebooks">
                  Notebooks
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="includeTags">
                  Tags
                </label>
              </div>
              <!--<div class="form-group">
                <label for="noteGUID">Note GUID</label>
                <input type="text" class="form-control input-sm" id="noteGUID" name="guid" placeholder="Enter Note GUID" data-bv-notempty data-bv-notempty-message= "You must provide the GUID of a note to update." data-bv-uuid data-bv-uuid-message="Enter a valid GUID" data-bv-uuid-version="4">
              </div>-->
              <button type="submit" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-filter"></span> Find Related Items</button>
            </form>
          </div>
        </div>

        <!-- Get Tags -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title api-path">
              <a data-toggle="collapse" data-parent="#accordion" href="#form-get-tags">
              Get all tags for user
              </a>
            </h4>
          </div>
          <div id="form-get-tags" class="panel-collapse collapse">
            <form role="form" class="panel-body" id="get-tags" method="get" action="/api/tags">
              <h5>/api/tags <span class="label label-info">GET</span></h5>
              <button type="submit" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-tag"></span> List All Tags</button>
            </form>
          </div>
        </div>

        <!-- Delete Note in Notebook -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title api-path">
              <a data-toggle="collapse" data-parent="#accordion" href="#form-delete-note">
              Delete a note
              </a>
            </h4>
          </div>
          <div id="form-delete-note" class="panel-collapse collapse">
            <form role="form" class="panel-body" id="delete-note" method="delete" action="/api/note/:guid">
              <h5>/api/note/:guid <span class="label label-info">DELETE</span></h5>
              <div class="form-group">
                <label for="noteGUID">Note GUID</label>
                <input type="text" class="form-control input-sm" id="noteGUID" name="guid" placeholder="Enter Note GUID" data-bv-notempty data-bv-uuid data-bv-uuid-message="Enter a valid GUID" data-bv-uuid-version="4">
              </div>
              <button type="submit" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-remove"></span> Delete Note</button>
            </form>
          </div>
        </div>

      </div>
    </div>

    <div class="col-sm-7">
      <div class="panel panel-default">
        <div class="panel-heading clearfix">
          <h3 class="panel-title pull-left">Response Output</h3>
          <div class="theme-selector btn-group pull-right" data-toggle="buttons">
            <label class="btn btn-xs btn-default active">
              <input type="radio" name="outputTheme" value="github"> Light Theme
            </label>
            <label class="btn btn-xs btn-default">
              <input type="radio" name="outputTheme" value="obsidian"> Dark Theme
            </label>
          </div>
        </div>
        <div class="panel-body">
          <div class="response-output"></div>
        </div>
      </div>
    </div>
  </div>
</div>

{{#yield-scripts}}
<script>
  require(['js/common'], function (common) {
    require(['js/apitest'], function (APITest) {
      new APITest();
    });
  });
</script>
{{/yield-scripts}}