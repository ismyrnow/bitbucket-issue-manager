'use strict';
var express = require('express');
var passport = require('passport');

var router = new express.Router();

// Redirect the user to the OAuth provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
router.get('/provider', passport.authenticate('provider'));

// The OAuth provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
router.get('/provider/callback',
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/auth/failure' }));


router.get('/failure', function(req, res) {
  res.send('oauth failed');
});

module.exports = router;
