var Evernote = require('evernote').Evernote;

exports.getUser = function (req, res) {

  // Check for valid session
  if (!req.session.oauthAccessToken) {
    return res.send('User is not authenticated.', 401);
  }
  
  var client = new Evernote.Client({token: req.session.oauthAccessToken});
  var userStore = client.getUserStore();
  
  user = userStore.getUser(function(err, user) {
    if (err) {
      if (err == 'EDAMUserException') {
        return res.send(err, 403);
      } else {
        return res.send(err, 500);
      }
    } else {
    return res.send(user, 200);
    }
  });
};