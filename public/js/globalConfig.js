define([], function () {
  var GlobalConfig = {
    baseArticleUrl: 'http://agave.dev.dowjones.com/ProjectMurdoch/api/GetViewerData?accessionno=',
    createNoteUrl: '/api/note',
    articleComponentOptions: {
      articleDisplayOptions: "Full",
      showSourceLinks: true,
      showAuthorLinks: true,
      showSocialButtons: false,
      showTranslator: false,
      showPostProcessing: true,
      postProcessingOptionsWithToken: [{
        option: "print disabled",
        token: "Print Friendly"
      }, {
        option: "email disabled",
        token: "Share"
      }, {
        option: "en-note-save-full",
        token: "Save to Evernote"
      }]
    }
  }

  return GlobalConfig;
});