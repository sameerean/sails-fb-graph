/**
 * Facebook Configuration (sails.config.facebook)
 * 
 */
module.exports.facebook = {

//	FACEBOOK_CLIENT_ID : "YOUR-FACEBOOK_CLIENT_ID",
//	FACEBOOK_CLIENT_SECRET : "YOUR-FACEBOOK_CLIENT_SECRET",
//	FACEBOOK_AUTH_CALLBACK_URL : "http://YOUR-IP:PORT/auth/facebook/callback" /*http://localhost:1337/auth/facebook/callback*/
		FACEBOOK_CLIENT_ID : "179057812298343",
		FACEBOOK_CLIENT_SECRET : "a4572f97e4595bcd66998015005be02a",
		FACEBOOK_AUTH_SCOPE : "email, user_address, user_about_me, user_birthday, user_location, publish_actions, user_friends",
		FACEBOOK_AUTH_CALLBACK_URL : "http://192.168.1.145:1337/auth/facebook"
		
};
