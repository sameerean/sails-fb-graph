//var passport = require('passport');
var graph     = require('fbgraph');

/**
 * Authentication Controller
 * 
 * 
 */
var AuthController = {
		index : function(req, res) {
			res.view();
		},
		login : function(req, res) {
			res.view("login");
		},

	fbLogin : function(req, res, next) {
		
		// we don't have a code yet
		  // so we'll redirect to the oauth dialog
		  if (!req.query.code) {
		    var authUrl = graph.getOauthUrl({
		        "client_id":     sails.config.facebook.FACEBOOK_CLIENT_ID,
		        "redirect_uri":  sails.config.facebook.FACEBOOK_AUTH_CALLBACK_URL,
		        "scope":         sails.config.facebook.FACEBOOK_AUTH_SCOPE,
		    });

		    if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
		      res.redirect(authUrl);
		    } else {  //req.query.error == 'access_denied'
		      res.send('access denied');
		    }
		    return;
		  }
			console.info(">>>> fbLogin - 1 ");

		  // code is set
		  // we'll send that and get the access token
		  graph.authorize({
		      "client_id":      sails.config.facebook.FACEBOOK_CLIENT_ID,
		      "redirect_uri":   sails.config.facebook.FACEBOOK_AUTH_CALLBACK_URL,
		      "client_secret": sails.config.facebook.FACEBOOK_CLIENT_SECRET,
		      "code":           req.query.code
		  }, function (err, facebookRes) {
				console.info(">>>> fbLogin - 4 - err = " + err + ", facebookRes = " + JSON.stringify(facebookRes));
				if (err) {
					console.info(">>>> fbLogin - 5 - facebookRes = " + facebookRes);
					req.session.flash = 'There was an error';
					req.session.fbAccessToken = null;
					res.redirect('/auth/failed');
				} else {
					console.info(">>>> fbLogin - 6 - req = " + req
							+ "; res = " + res);
					req.session.fbAccessToken = facebookRes.access_token;
					
					var _userModel = User;
					
					var getResult = graph.get("me?fields=id, first_name, last_name, gender, email, cover, about, birthday, bio, currency, picture", {access_token: req.session.fbAccessToken}, function(err, queryResponse) {
						console.info(">>>> fbLogin - 7 - queryResponse = " + queryResponse);

						_userModel.find().where({pid: queryResponse.id}).then(function(_users){
								console.info(">>>> fbLogin - 8 - _users = " + JSON.stringify(_users));
							  if(_users && _users.length > 0) {
									console.info(">>>> fbLogin - 9 - _users.length = " + _users.length);
									_userModel.update({id: _users[0].id}, {

								    	email: queryResponse.email,
								    	firstName: queryResponse.first_name,
								    	lastName: queryResponse.last_name,
								    	imageUrl: queryResponse.picture.data.url

								          // You can also add any other data you are getting
											// back from Facebook here
								          // as long as it is in your model

								        }).then(function (_updatedUsers) {
											console.info(">>>> fbLogin - 10 - _user = " + JSON.stringify(_updatedUsers));
								            console.log("User updated: " + JSON.stringify(_updatedUsers));
								            req.session.user = _updatedUsers[0];
								            res.redirect('/secured/home');
//								            return done(null, _user, "New");
								        }).catch(function (err) {
											console.info(">>>> fbLogin - 11 - err = " + JSON.stringify(err));
											console.error("Error on creating user");
								            console.error(err);
								            console.error(JSON.stringify(err));
								            req.session.user = null;
								            res.redirect('/auth/failed');
//								            return done(err);
								        });
									console.info(">>>> fbLogin - 12 ");
//									return;
							  } else {
									console.info(">>>> fbLogin - 13 ");
								  User.create({

								    	pid: queryResponse.id,
								    	email: queryResponse.email,
								    	firstName: queryResponse.first_name,
								    	lastName: queryResponse.last_name,
								    	imageUrl: queryResponse.picture.data.url

								          // You can also add any other data you are getting
											// back from Facebook here
								          // as long as it is in your model

								        }).then(function (_user) {
											console.info(">>>> fbLogin - 14 - _user = " + JSON.stringify(_user));
								            console.log("User created: " + JSON.stringify(_user));
								            req.session.user = _user;
								            res.redirect('/secured/home');
//								            return done(null, _user, "New");
								        }).catch(function (err) {
											console.info(">>>> fbLogin - 15 - err = " + JSON.stringify(err));
								            console.error("Error on creating user");
								            console.error(err);
								            console.error(JSON.stringify(err));
								            req.session.user = null;
								            res.redirect('/auth/failed');
//								            return done(err);
								        });
							  }
							  
						  }).catch(function (err) {
								console.info(">>>> fbLogin - 16 - err = " + JSON.stringify(err));
					            console.log("ERROR finding user with pid - " + queryResponse.id + ".... ");
					            console.error(err);
					            console.error(JSON.stringify(err));
					            req.session.user = null;
					            res.redirect('/auth/failed');
//					            return done(err);
					        });
					
						  
						  
						});
					console.info(">>>> fbLogin - 17 - getResult = " + JSON.stringify(getResult));
//					return getResult;
					
					
					/*
					
					var query = {
						    name:         "SELECT name, email, about, birthday FROM user WHERE uid = me()",
//						   permissions:  "SELECT email, user_about_me, user_birthday FROM permissions WHERE uid = me()"
						};
					
					var options = {access_token: req.session.fbAccessToken};
					var _fql = graph.fql(query, options, function(err, fqlRes) {
						  console.log(JSON.stringify(fqlRes)); // { data: [ { name: 'Ricky Bobby' } ] }
						});
					*/
//					req.session.user = user;
//					res.redirect('/home');
				}
				console.info(">>>> fbLogin - 18 - END ");
//				return;
		  });
//			return;

		
		
		
		

/*
		passport.authenticate(
				'facebook',
				{
					// failureRedirect: '/auth/failed',
					scope : [ 'email', 'user_about_me', 'user_friends' ]
				},
				function(err, user) {
					console.info(">>>> fbLogin - 2 - req = " + req + "; res = "
							+ res);
					req.logIn(user, function(err) {
						console.info(">>>> fbLogin - 3 - req = " + req
								+ "; res = " + res);
						if (err) {
							console.info(">>>> fbLogin - 4 - req = " + req
									+ "; res = " + res);
							req.session.flash = 'There was an error';
							res.redirect('/auth/failed');
							return;
						} else {
							console.info(">>>> fbLogin - 5 - req = " + req
									+ "; res = " + res);
							req.session.user = user;
							res.redirect('/home');
							return;
						}
					});
				})(req, res, next);
*/
	},

	/*
	fbLoginCallBack : function(req, res, next) {

		passport.authenticate(
				'facebook',
				function(err, user, info) {
					console.info(">>>> fbLoginCallback - 3 - err = " + err
							+ "; user = " + JSON.stringify(user) + "; info = "
							+ info);
					req.session.user = user;
					return res.redirect("home");
				})(req, res, next);
	},
*/	
	
	logout : function(req, res) {
		req.session.user = null;
		req.session.flash = 'You have logged out';
		res.redirect('/');
	},

	fbLoginFailed : function(req, res) {
		req.session.user = null;
		res.view('fbLoginFailed');
	},

};

module.exports = AuthController;
