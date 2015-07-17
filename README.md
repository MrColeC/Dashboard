## Dashboard
### For Macro Project Management

This is a simple project management dashboard using the (MEAN stack).


<br>
##### Infrastructure Requirements:
+ Node.js with NPM is installed
+ MongoDB is accessible on the same host running the site on the regular port (127.0.0.1:27017)
+ Port 8080 is available on the host to bind to/answer requests from
  - _Optional_: port forward 80 to 8080 via your firewall rules to allow traditional website access

##### Installation
1. Checkout the code
1. Run "npm install"

##### Configuration
1. The website is "protected" using a very basic authentication. The usernames/passwords could (should) be changed in /user.htpasswd
  1. The format is _username_:_password_

##### Start
1. Start MongoDB
1. Switch to a non-root user
1. Type: npm start
  1. You can launch this under a linux screen to enable a more persistent run time

##### Features
+ CRUD (Create, Read, Update, Delete) new and exisiting projects
+ Projects are stored as objects within MongoDB
+ All expensive calls are wrapped in functions with callbacks
+ All client side javascript calls hook UI updates so the screen never requires a hard refresh

##### Currently non supported
1. When another user commits a change/addition, an update is pushed to your screen
1. The ability to recover previously deleted projects (rows)
1. The ability to roll back changes/edits to an existing project 
