<div class="modal fade" id="noteModal-{{note.guid}}" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{note.title}}</h4>
      </div>
      <div class="modal-body">
        {{{content}}}
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->