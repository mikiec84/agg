<div class="modal fade en-create-modal" id="en-create-modal" role="dialog" aria-labelledby="CreateNoteModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form role="form" class="en-create-form" id="create-note" method="post" action="/api/note">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <span class="social evernote"></span>
          <h4 class="modal-title">Save to Evernote</h4>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <h5 class="note-title" data-target="#noteTitle">
              <span class="note-title-text">{{noteTitle}}</span>
              <button type="button" class="btn btn-link edit-title"><span class="glyphicon glyphicon-pencil"></span></button>
            </h5>
            <input type="text" class="form-control input-sm hidden" id="noteTitle" name="noteTitle" value="{{noteTitle}}" placeholder="Enter Note Title" data-bv-notempty data-bv-notempty-message="You must give your note a title.">
          </div>
          <div class="form-group">
            <div class="well well-sm">
              <div class="loading {{#noteBody}}hidden{{/noteBody}}"><span class="spinner"></span></div>
              <div class="note-body">
                {{{noteBody}}}
              </div>
            </div>
          </div>
          <div class="form-group optional">
            <label for="noteComments">Additional Comments</label>
            <textarea class="form-control input-sm" id="noteComments" rows="3" name="noteComments" placeholder="Enter Comments"></textarea>
          </div>
          <div class="row">
            <div class="form-group optional col-sm-6">
              <label for="noteTags">Tags</label>
              <input type="text" class="form-control input-sm" id="noteTags" name="noteTags" placeholder="Enter Note Tags">
            </div>
            <div class="form-group col-sm-6">
              <label for="parentNotebook">Notebook</label>
              <select class="form-control input-sm" id="parentNotebook" name="parentNotebook">
                {{#notebooks}}
                  <option value="{{guid}}"{{#isSelected}} selected{{/isSelected}}>{{name}}</option>
                {{/notebooks}}
              </select>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-sm btn-primary{{^noteBody}} disabled{{/noteBody}}"><span class="glyphicon glyphicon-plus"></span> Create Note</button>
        </div>
      </form>
    </div>
  </div>
</div>