var Evernote = require('evernote').Evernote;
var enml = require('enml-js');

/**
 * NotesMetadataResultSpec
 * This structure is provided to the findNotesMetadata function to specify the subset of fields
 * that should be included in each NoteMetadata element that is returned in the NotesMetadataList.
 * The default behavior is to include nothing in replies (but the mandatory GUID).
 * http://dev.evernote.com/doc/reference/NoteStore.html#Struct_NotesMetadataResultSpec
 * @param  {bool}  includeTitle 
 * @param  {bool}  includeContentLength 
 * @param  {bool}  includeCreated 
 * @param  {bool}  includeUpdated 
 * @param  {bool}  includeDeleted 
 * @param  {bool}  includeUpdateSequenceNum 
 * @param  {bool}  includeNotebookGuid 
 * @param  {bool}  includeTagGuids 
 * @param  {bool}  includeAttributes 
 * @param  {bool}  includeLargestResourceMime 
 * @param  {bool}  includeLargestResourceSize 
 */

 /**
 * NoteFilter
 * A list of criteria that are used to indicate which notes are desired from the account.
 * This is used in queries to the NoteStore to determine which notes should be retrieved.
 * http://dev.evernote.com/doc/reference/NoteStore.html#Struct_NoteFilter
 * @param  {integer} order 
 * @param  {bool}    ascending 
 * @param  {string}  words 
 * @param  {guid}    notebookGuid 
 * @param  {array}   tagGuids 
 * @param  {string}  timeZone 
 * @param  {bool}    inactive 
 * @param  {string}  emphasized 
 */

 /**
 * RelatedQuery
 * A description of the thing for which we are searching for related entities.
 * You must specify either noteGuid or plainText, but not both. filter and referenceUri are optional.
 * http://dev.evernote.com/doc/reference/NoteStore.html#Struct_RelatedQuery
 * @param  {guid}       noteGuid
 * @param  {string}     plainText
 * @param  {NoteFilter} filter
 * @param  {string}     referenceUri
 */

 /**
 * RelatedResultSpec
 * A description of the thing for which the service will find related entities, via findRelated(),
 * together with a description of what type of entities and how many you are seeking in the RelatedResult.
 * http://dev.evernote.com/doc/reference/NoteStore.html#Struct_RelatedResultSpec
 * @param  {integer}  maxNotes
 * @param  {integer}  maxNotebooks
 * @param  {integer}  maxTags
 * @param  {bool}     writableNotebooksOnly
 * @param  {bool}     includeContainingNotebooks
 */

var EDAMErrorCodes = Object.freeze({
  "1": "UNKNOWN",
  "2": "BAD_DATA_FORMAT",
  "3": "PERMISSION_DENIED",
  "4": "INTERNAL_ERROR",
  "5": "DATA_REQUIRED",
  "6": "LIMIT_REACHED",
  "7": "QUOTA_REACHED",
  "8": "INVALID_AUTH",
  "9": "AUTH_EXPIRED",
  "10": "DATA_CONFLICT",
  "11": "ENML_VALIDATION",
  "12": "SHARD_UNAVAILABLE",
  "13": "LEN_TOO_SHORT",
  "14": "LEN_TOO_LONG",
  "15": "TOO_FEW",
  "16": "TOO_MANY",
  "17": "UNSUPPORTED_OPERATION",
  "18": "TAKEN_DOWN",
  "19": "RATE_LIMIT_REACHED"
});

var NoteSortOrder = Object.freeze({
  "1": "CREATED",
  "2": "UPDATED",
  "3": "RELEVANCE",
  "4": "UPDATE_SEQUENCE_NUMBER",
  "5": "TITLE"
});

function getNoteStore (token) {
  var client = new Evernote.Client({token: token});
  return client.getNoteStore();
};

function formatError (err) {
  if (err.errorCode) {
    if (err.parameter) {
      err.exception = "EDAMUserException";
    }
    if (err.message) {
      err.exception = "EDAMSystemException";
    }
    err.errorType = EDAMErrorCodes[err.errorCode];
  }
  if (err.identifier) {
    err.exception = "EDAMNotFoundException";
  }
  return err;
};

// function checkForValidSession (req, res) {
//   console.log("checking for valid session");
//   if (!req.session.oauthAccessToken) {
//     return res.send('User is not authenticated.', 401);
//   }
// };

exports.getNotebooks = function (req, res) {

  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }
  
  var noteStore = getNoteStore(req.session.oauthAccessToken);
  notebooks = noteStore.listNotebooks(function(err, notebooks) {
    if (err) {
      return res.send(formatError(err), 500);
    }
    return res.send(notebooks, 200);
  });
};

exports.getNotesByNotebook = function (req, res) {

  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }

  var noteStore, noteFilter, notesMetadataResultSpec;
  noteStore = getNoteStore(req.session.oauthAccessToken);
  
  noteFilter = new Evernote.NoteFilter({
    notebookGuid: req.params.guid,
    inactive: req.query.showTrash === 'true',
    order: req.query.order,
    ascending: req.query.ascending === 'true'
  });
  
  notesMetadataResultSpec = new Evernote.NotesMetadataResultSpec({
    includeTitle: true,
    includeContentLength: true,
    includeCreated: true,
    includeUpdated: true,
    includeDeleted: true
  });

  notes = noteStore.findNotesMetadata(noteFilter, 0, 100, notesMetadataResultSpec, function (err, notes) {
    if (err) {
      return res.send(formatError(err), 500);
    }
    return res.send(notes, 200);
  });
};

exports.getNoteById = function (req, res) {

  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }

  if (!req.body) {
    return res.send('Invalid content', 400);
  }

  var noteStore, noteFilter, notesMetadataResultSpec, withContent, withResourcesData, withResourcesRecognition, withResourcesAlternateData;
  noteStore = getNoteStore(req.session.oauthAccessToken);

  // Default to true unless query is passed
  withContent = req.query.withContent ? (req.query.withContent === 'true') : true;
  withResourcesData = req.query.withResourcesData ? (req.query.withResourcesData === 'true') : true;
  // withResourcesRecognition = req.query.withResourcesRecognition === 'true';
  // withResourcesAlternateData = req.query.withResourcesAlternateData === 'true';

  note = noteStore.getNote(req.params.guid, withContent, withResourcesData, false, false, function (err, note) {
    if (err) {
      return res.send(formatError(err), 500);
    }
    var content = note.content;  // ENML content
    var resources = note.resources; // The resources (images), don't forget this
    var html = enml.HTMLOfENML(content, resources);
    return res.send({note:note, content:html}, 200);
  });
};

exports.createNote = function (req, res) {

  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }

  // if (!req.body || !req.body.noteTitle || !req.body.noteBody) {
  //   return res.send('Invalid content', 400);
  // }

  var noteStore, nBody, ourNote, noteTitle, noteBody, parentNotebook, noteTags;
  noteStore = getNoteStore(req.session.oauthAccessToken);

  // Get request body
  noteTitle = req.body.noteTitle;
  noteBody = req.body.noteBody;
  parentNotebook = req.body.parentNotebook;
  noteTags = req.body.noteTags;

  // Create note object
  var ourNote = new Evernote.Note();
  ourNote.title = noteTitle;
  // ourNote.content = enml.ENMLOfPlainText(noteBody); //works for just text but doesnt do html

  // make ENML
  if (noteBody) {
    nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
    nBody += "<en-note>" + noteBody + "</en-note>";
    ourNote.content = nBody;
  }
 
  // parentNotebook is optional; if omitted, default notebook is used
  if (parentNotebook && parentNotebook.guid) {
    ourNote.notebookGuid = parentNotebook.guid;
  }
  
  // tagNames is optional
  if (noteTags) {
    ourNote.tagNames = [];
 
    // Find any tags inside quotes
    var quoteTags = noteTags.match(/(\"[^\"]+\")|(\'[^']+\')/g);
    if (quoteTags && quoteTags.length) {
      quoteTags.forEach(function (tag, index) {
        tag = tag.replace(/\"|\'/g, "");
        ourNote.tagNames.push(tag);
      });
    }
    // Strip out tags with quotes
    noteTags = noteTags.replace((/(\"[^\"]+\")|(\'[^']+\')/g), "");
    // Replace whitespaces with commas, split into array, filter out empty strings
    noteTags = noteTags.replace(/\s*,*\s+/g,",").split(',').filter(Boolean);
    // Join arrays
    ourNote.tagNames = ourNote.tagNames.concat(noteTags);
  }
 
  // Attempt to create note in Evernote account
  noteStore.createNote(ourNote, function(err, note) {
    if (err) {
      return res.send(formatError(err), 500);
    }
    return res.send(note, 200);
  });
 
};

exports.updateNote = function (req, res) {

  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }

  // if (!req.body || !req.body.noteTitle) {
  //   return res.send('Invalid content', 400);
  // }

  var noteStore, nBody, ourNote, noteTitle, noteBody, parentNotebook, noteTags;
  noteStore = getNoteStore(req.session.oauthAccessToken);

  // Get request body
  noteTitle = req.body.noteTitle;
  noteBody = req.body.noteBody;
  parentNotebook = req.body.parentNotebook;
  noteTags = req.body.noteTags; 
 
  // Create note object
  var ourNote = new Evernote.Note();
  ourNote.guid = req.params.guid;
  ourNote.title = noteTitle;

  // content is optional when updating
  if (noteBody) {
    nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
    nBody += "<en-note>" + noteBody + "</en-note>";
    ourNote.content = nBody;
  }
 
  // parentNotebook is optional; if omitted, default notebook is used
  if (parentNotebook && parentNotebook.guid) {
    ourNote.notebookGuid = parentNotebook.guid;
  }

  // tagNames is optional
  if (noteTags) {
    ourNote.tagNames = noteTags.split(',');
  }
 
  // Attempt to create note in Evernote account
  noteStore.updateNote(ourNote, function(err, note) {
    if (err) {
      return res.send(formatError(err), 500);
    }
    return res.send(note, 200);
  });
};

exports.getRelatedItems = function (req, res) {
  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }

  // if (!req.body || !req.body.relatedQuery) {
  //   return res.send('Invalid content', 400);
  // }

  var noteStore, resultSpecOpts, relatedQuery, relatedResultSpec;
  noteStore = getNoteStore(req.session.oauthAccessToken);

  relatedQuery = new Evernote.RelatedQuery({
    plainText: req.body.relatedQuery
  });

  resultSpecOpts = {
    maxNotes: Evernote.EDAM_RELATED_MAX_NOTES,
    maxNotebooks: Evernote.EDAM_RELATED_MAX_NOTEBOOKS,
    maxTags: Evernote.EDAM_RELATED_MAX_TAGS,
    writableNotebooksOnly: false,
    includeContainingNotebooks: true
  };

  if (req.body.includeNotes === 'false') {
    delete resultSpecOpts.maxNotes;
  }
  if (req.body.includeNotebooks === 'false') {
    delete resultSpecOpts.maxNotebooks;
  }
  if (req.body.includeTags === 'false') {
    delete resultSpecOpts.maxTags;
  }

  relatedResultSpec = new Evernote.RelatedResultSpec(resultSpecOpts);

  noteStore.findRelated(relatedQuery, relatedResultSpec, function(err, relatedItems) {
    if (err) {
      return res.send(formatError(err), 500);
    }
    return res.send(relatedItems, 200);
  });
};

exports.getTags = function (req, res) {

  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }
  
  var noteStore = getNoteStore(req.session.oauthAccessToken);
  tags = noteStore.listTags(function(err, tags) {
    if (err) {
      return res.send(formatError(err), 500);
    }
    return res.send(tags, 200);
  });
};

exports.deleteNote = function (req, res) {

  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }

  var noteStore;
  noteStore = getNoteStore(req.session.oauthAccessToken);

  noteStore.deleteNote(req.params.guid, function (err, note) {
    if (err) {
      return res.send(formatError(err), 500);
    }
    return res.send(note, 200);
  });
};