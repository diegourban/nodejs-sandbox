# nodejs-sandbox
Sandbox project to study and play around with Node.js.

## Requirements
* MySQL

## Installation
* `mysql> create database nodejs_sandbox;` - to create the dev database
* `mysql> create database nodejs_sandbox_test;` - to create the test database
* `$mysql -u root -p -h localhost nodejs_sandbox < nodejs_sandbox.sql` - to import the initial data to the dev database
* `$mysql -u root -p -h localhost nodejs_sandbox_test < nodejs_sandbox.sql` - to import the initial data to the test database
* `$npm install` - to install dependecies
* `$sudo npm install -g nodemon` - to install nodemon globally

## Usage
* `node hello-world.js` - simple hello world
* `node first-server.js` - simple node.js server
* `nodemon app` - to start the app monitoring changes with nodemon
* `node client-test-get.js` - to simulate a client get (app must be started)
* `node client-test-post.js` - to simulate a client post (app must be started)

## Extra - Heroku
* `heroku apps:create nodejs-sandbox-heroku` - to create the heroku app
* `heroku addons:create cleardb:ignite` - to create MySQL addon
* `heroku config` - to check the configs
* `mysql -h <heroku_host> -u <heroku_user> -p` - to connect to heroku's mysql, you may also need to create the table
* `git push heroku master` - to deploy to heroku
