/**
 * Route Mappings (sails.config.routes)
 * 
 * Your routes map URLs to views and controllers.
 * 
 * If Sails receives a URL that doesn't match any of the routes below, it will
 * check for matching files (images, scripts, stylesheets, etc.) in your assets
 * directory. e.g. `http://localhost:1337/images/foo.jpg` might match an image
 * file: `/assets/images/foo.jpg`
 * 
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 * 
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default
 * Gruntfile in Sails copies flat files from `assets` to `.tmp/public`. This
 * allows you to do things like compile LESS or CoffeeScript for the front-end.
 * 
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

	/***************************************************************************
	 * * Make the view located at `views/homepage.ejs` (or
	 * `views/homepage.jade`, * etc. depending on your default view engine) your
	 * home page. * * (Alternatively, remove this and add an `index.html` file
	 * in your * `assets` directory) * *
	 **************************************************************************/

	'/' : {
		controller : 'home',
		action : "default"
	},

	/***************************************************************************
	 * * Custom routes here... * * If a request to a URL doesn't match any of
	 * the custom routes above, it * is matched against Sails route blueprints.
	 * See `config/blueprints.js` * for configuration options and examples. * *
	 **************************************************************************/
	'get /auth/facebook' : {
		controller : 'auth',
		action : "fbLogin"
	},
	// 'get /auth/facebook/callback' : {
	// controller : 'auth',
	// action : "fbLoginCallback"
	// },
	'get /auth/failed' : {
		controller : 'auth',
		action : "fbLoginFailed"
	},
	'get /secured/home' : {
		controller : 'home',
		action : "home"
	},
	'get /auth/logout' : {
		controller : 'auth',
		action : "logout"
	},
	'get /login' : {
		view: 'login',
	    locals: {
	      layout: null
	    }
	},
/*	'get /login' : {
		controller : 'auth',
		action : "login"
	},
*/	'get /secured/myprofile' : {
		controller : 'home',
		action : "myProfile"
	},
	'get /secured/myfriends' : {
		controller : 'home',
		action : "myFriends"
	},
	'get /secured/postToWall' : {
		controller : 'home',
		action : "showPostToWall"
	},
	'post /secured/postToWall' : {
		controller : 'home',
		action : "postToWall"
	},
	'get /secured/showMyPosts' : {
		controller : 'home',
		action : "showMyPosts"
	},
	'get /secured/showPostDetail' : {
		controller : 'home',
		action : "showPostDetail"
	},
	'post /secured/likePost' : {
		controller : 'home',
		action : "likePost"
	},
	'post /secured/addComment' : {
		controller : 'home',
		action : "addNewComment"
	},

};
