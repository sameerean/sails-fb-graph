var graph = require('fbgraph');

var HomeController = {

	default : function(req, res, next) {
		console.info(">>>>>>>>>>>>>>>>>>>> Home default!!");
		res.redirect("/secured/home");
	},
	
	home : function(req, res, next) {
		console.info(">>>>>>>>>>>>>>>>>>>> Home secured home!!");
		res.view("home", {
			title: "Overview"
		});
	},
	myProfile: function(req, res, next) {
		res.view("myProfile", {
			title: "My Profile",
			user: req.session.user
		});
	},

};

module.exports = HomeController;
