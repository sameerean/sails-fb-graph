# sails-fb-auth

This is a sample Sails JS application that performs Facebook Graph API operations using fbgraph (NodeJS) library. It uses a Postgresql DB by default, you can switch it to any other DB(in-memory or MySQL or Mongo..) as you wish.

#Important files to see.
   -   config/facebook.js >  To set the Facebook App configurations - Set your params here!
   -   config/http.js > Session Filtering happens here - Users are redirected to login screen if not logged in already. See the sessionFilter middleware for the specific implementation.
   -   config/connections.js >  To set the DB parameters. By default, postgresql is configured.
   -   config/models.js >  To switch the DB. By default, postgresql is configured.
   -   config/routes.js >  The auth routes and other routes, uses appropriate controllers.
   -   api/controllers/AuthController.js > Methods for authentication with Facebook
   -   api/controllers/HomeController.js > Simple methods for home and profile page navigations
   -   api/controllers/FbGraphController.js > Handled Facebook Graph API operations
   -   api/models/User.js > The User Model
   -   api/models/Post.js > The Post Model
   -   views/home.ejs > Home View, after login (Protected - needs login)
   -   views/login.ejs > Login View
   -   views/myProfile.ejs > User Profile View (Protected - needs login)
   -   views/myFriends.ejs > List of Facebook Freinds who has connected to this app (Protected - needs login)
   -   views/postToWall.ejs > Posts to Facebook Wall as well as to the local DB (Protected - needs login)
   -   views/showMyPosts.ejs > Lists all posts made via this app (Protected - needs login)
   -   views/showPostDetail.ejs > Show the details about this post - comments, likes etc. (Protected - needs login)
   

### Version
1.0

### Setup

   1. Checkout this repository from Github > ```$ git clone https://github.com/sameerean/sails-fb-auth.git ```
   2. Navigate into the directory > ```$ cd sails-fb-auth.git```
   3. Run ```$ npm install``` to install the dependencies
   4. Setup your Database (By default, Postgersql - DB name: sails-fb-auth, schema - sails-fb-auth, user - sails-fb-auth, password, sails-fb-auth. You may change DB as well as other params you wish
   5. Set up your DB settings at config/connections.js (based on the previous step)
   6. Create your FB App [here](https://developers.facebook.com/apps)
   7. Set the Site URL of your Sails App (localhost, IP or Domain name, appropriately) at Settings > Site URL
   8. Configure your FB App params in config/facebook.js - You get those from FB App page > Dashboard
   9. Lift Sails > ```$ sails lift```
   10. Open the app in your browser > http://localhost:1337
   11. Login, play around.
   
