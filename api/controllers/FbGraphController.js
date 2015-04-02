var graph = require('fbgraph');

var FbGraphController = {

	myFriends: function(req, res, next) {
		graph.setAccessToken(req.session.fbAccessToken);
// graph.get("/me/friends",{limit: 50, access_token: req.session.fbAccessToken},
// function(err, result) {
		graph.get("/me/friends",{limit: 50}, function(err, result) {
			  console.log("My Friendlist = " + JSON.stringify(result)); // {
																		// image:
																		// true,
																		// location:
								// "http://profile.ak.fb..." }
				res.view("myFriends", {
					user: req.session.user, 
					userFriends: result.data,
					title: "My Friends",
					});
			});
		
	},
	showPostToWall: function(req, res, next) {
		res.view("postToWall", {
			user: req.session.user, 
			successMessage: "",
			title: "Post a message to your Facebook Wall"
				});
	},
	postToWall: function(req, res, next) {
		console.info("Posting...........................................message = " + req.param("message"));
		
		graph.setAccessToken(req.session.fbAccessToken);
		var successMessage = "";
		if(req.param("message") === null || req.param("message") === "") {
			res.view("postToWall", {user: req.session.user, successMessage: "Null Message: Not posted"});
		} else {
			
			Post.create({
				message: req.param("message"),
				user: req.session.user
			}).then(function (_post) {
				console.info(">>>> Post created - 14 - _user = " + JSON.stringify(_post));

				graph.post("/feed", {message: req.param("message")}, function(err, response) {
				  // returns the post id
				  console.log( " " + "Message posted successfully: post-id = " + JSON.stringify(response)); // {
				  _post.pid = response.id;
				  console.log( " " + "Message posted successfully: _post.pid = " + _post.pid); // {
				  
				  Post.update({id: _post.id}, _post.toJSON()).then(function (_updatedPosts){
					  console.log("Post updated ---- 1");
								            console.log("Post updated: " + JSON.stringify(_updatedPosts));
											res.view("postToWall", {
												user: req.session.user, 
												successMessage: "Message posted successfully: post-id = " + response.id,
												title: "Post a message to your Facebook Wall"
													});
				  }).catch(function(err) {
						console.error("Error on updating post");
			            console.error(err);
			            console.error(JSON.stringify(err));
						res.view("postToWall", {
							user: req.session.user, 
							successMessage: "Error posting message, err = " + JSON.stringify(err),
							title: "Post a message to your Facebook Wall"
								});
				  });
				  });
					/*
					 * res.view("postToWall", { user: req.session.user,
					 * successMessage: "Message posted successfully: post-id = " +
					 * response.id, title: "Post a message to your Facebook
					 * Wall" });
					 */
				  
				}).catch(function(err) {
					console.error("Error on updating post");
		            console.error(err);
		            console.error(JSON.stringify(err));
					res.view("postToWall", {
						user: req.session.user, 
						successMessage: "Error posting message, err = " + JSON.stringify(err),
						title: "Post a message to your Facebook Wall"
							});
					
				});
		}
	},
	showMyPosts:  function(req, res, next) {
		Post.find({user: req.session.user.id}).sort("createdAt desc").then(function(posts) {
			console.info("posts found = " + JSON.stringify(posts));
			res.view("showMyPosts", {
				user: req.session.user, 
				title: "Show all Facebook Posts",
				posts: posts
					});
		}).catch(function(err) {
			console.info(err);
			res.view("showMyPosts", {
				user: req.session.user, 
				title: "Show all my Facebook Posts",
				error: err,
				});
		});
	},
	showPostDetail: function(req, res, next) {
		
		graph.setAccessToken(req.session.fbAccessToken);
		graph.get("/" + req.param("postId"), function(err, result) {
			console.info("post found = " + JSON.stringify(result));
			var post = result;
			
			graph.get("/" + req.param("postId") + "/likes", function(err, likesResult) {
				  console.log(">>>>>>>>>>>>>> err = " + JSON.stringify(err)); // {
				  console.log(">>>>>>>>>>>>>> Likes = " + JSON.stringify(likesResult)); // {
																			// image:
																			// true,
																			// location:
									// "http://profile.ak.fb..." }
					res.view("showPostDetail", {
						user: req.session.user, 
						title: "Post Detail",
						post: result,
						comments:(result.comments && result.comments.data) ? result.comments.data : [],
						likes: (likesResult && likesResult.data) ? likesResult.data : [],
						successMessage:""
				});
			});
/*			
			
			
			res.view("showPostDetail", {
				user: req.session.user, 
				title: "Post Detail",
				post: result,
				comments: (result.comments && result.comments.data) ? result.comments.data : []
			});
			
*/		});
/*		
		graph.setAccessToken(req.session.fbAccessToken);
		graph.get("/" + req.param("postId"), function(err, result) {
			console.info("post found = " + JSON.stringify(result));
			var post = result;
			
			graph.get("/" + req.param("postId") + "/comments", function(err, result) {
				  console.log(">>>>>>>>>>>>>> err = " + JSON.stringify(err)); // {
				  console.log(">>>>>>>>>>>>>> Comments = " + JSON.stringify(result)); // {
																			// image:
																			// true,
																			// location:
									// "http://profile.ak.fb..." }
					res.view("showPostDetail", {
						user: req.session.user, 
						title: "Post Detail",
						post: post,
						comments: (result && result.data) ? result.data : []
				});
			});
		});
*/		
		/*
			Post.findOne({id: req.param("postId")}).then(function(post) {
				console.info("post found = " + JSON.stringify(post));
				
				graph.setAccessToken(req.session.fbAccessToken);
				console.info(" >>>>>>>>>>>>>>>>>>>>>> post.pid = " + post.pid);
				graph.get("/" + post.pid + "/comments", function(err, result) {
					  console.log(">>>>>>>>>>>>>> err = " + JSON.stringify(err)); // {
					  console.log(">>>>>>>>>>>>>> Comments = " + JSON.stringify(result)); // {
																				// image:
																				// true,
																				// location:
										// "http://profile.ak.fb..." }
						res.view("showPostDetail", {
							user: req.session.user, 
							title: "Post Detail",
							post: post,
							comments: (result && result.data) ? result.data : []
					});
				
				
						});
			}).catch(function(err) {
				console.info(err);
				res.view("showPostDetail", {
					user: req.session.user, 
					title: "Post Detail",
					error: err
					});
			});*/
		},
		likePost: function(req, res, next) {
			console.info("Liking postttt ..... + postId = " + req.param("postId"));
			graph.post("/" + req.param("postId") + "/likes", function(err, likesResult) {
				  console.log(">>>>>>>>>>>>>> err = " + JSON.stringify(err)); // {
				  console.log(">>>>>>>>>>>>>> Likes = " + JSON.stringify(likesResult)); // {
				res.redirect("/secured/showPostDetail?postId="  + req.param("postId"));
			});
		},
		addNewComment: function(req, res, next) {
			console.info("Adding new comment ..... + postId = " + req.param("postId"));
			graph.post("/" + req.param("postId") + "/comments", {message: req.param("comment")}, function(err, likesResult) {
				  console.log(">>>>>>>>>>>>>> err = " + JSON.stringify(err)); // {
				  console.log(">>>>>>>>>>>>>> Likes = " + JSON.stringify(likesResult)); // {
				res.redirect("/secured/showPostDetail?postId="  + req.param("postId"));
			});
		}

};

module.exports = FbGraphController;
