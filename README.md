# [e**K**reative](https://www.ekreative.com/) [L**ek**torium](https://www.facebook.com/lektorium.ek/) NodeJS

This project build using [**M**ongoDB](https://www.mongodb.com/) [**E**xpressJS](https://expressjs.com/) [**V**ueJS](https://vuejs.org/) [**N**odeJS](https://nodejs.org/en/) stack, with VueJS single page application rendered on the client side.


## Technologies
This project uses:

[Mongo](https://www.mongodb.com/) for a NoSQL database.

[Express](https://expressjs.com/) For an HTTP Server

[VueJS](https://vuejs.org/) For Views, with the [Buefy](https://buefy.org/) Lightweight UI components based on [Bulma](https://bulma.io/) CSS Framework 

[Node](https://nodejs.org/en/) For a JavaScript runtime

## Installation

To install this project simply clone or download the repo:

`git clone https://github.com/constantinesimm/smartdesk.git <dir name>`

`cd <dir name>`

`npm install` - to install app and dev dependencies

`cp example.env .env` then add in your local Mongo URI and other credentials

### Setup/Development

To develop using this project you can run in separate terminal instances. This will allow hot reloading of both changes to the server and changes to the client.

`npm run dev:server` - to run Express dev mode

and

`npm run serve` - to run Vue dev mode 

or

`npm run dev:app` - to run fullstack app dev mode

The server will require you to be running a local instance of [MongoDB](https://www.mongodb.com/).

`npm run static` will build the client-side JavaScript and start the hot reloading of the server environment. 

`npm run dev:server` can also be used to just start the API if you are working on that prior to worrying about the client.


### Project Structure

##### Backend

`/server`

`--/bin/www`-- app server.

`--/controller/` -- contains controllers for our API resources.

`--/middleware/`-- any middleware you may need can go here.

`--/module/`-- all app modules with service, model and helpers.

`--/service/` -- contains services like database, passport, mailer for our app resources

`----/database/mongoose.js`-- contains the database connection.

`----/mailer/nodemailer.js`-- contains the templates and mailer config.

`----/auth/passport.js`-- contains app authentication engine.


##### Frontend

`/src`

`--/assets/`-- app styles, images and fonts.

`--/components/`-- app components.

`--/router/index.js`-- config for [Router](https://router.vuejs.org/), VueJS app router

`--/store/index.js`-- config for [Vuex](https://vuex.vuejs.org/), VueJS app store

`--/views/`-- separate Component Pages go here.

`--/App.vue`-- parent component wrapped around a router view of other components.

`--/main.js`-- registers the Vue components, Router and Store


### Requirements

This project will require:

* Node >=12.0
* npm >=6.0

### Dependencies 

* Dependencies Via NPM
	* [cors](https://github.com/expressjs/cors) For CORS during development
	* [dotenv](https://github.com/motdotla/dotenv) Loads our .env variables
	* [Axios](https://github.com/axios/axios) For client side HTTP requests
	* [Vue](https://vuejs.org/) Realtime data binding on the frontend
	* [Buefy](https://buefy.org/) VueJS Lightweight UI components
	* [Bulma](https://bulma.io/) CSS Framework
	* [Vue-router](https://github.com/vuejs/vue-router) Router for the SPA 
	* [Vuex](https://vuex.vuejs.org/) Store for VueJS


### Existing App Routes

All user endpoints are behind the `/api` endpoint.

#### `GET`
`/users` - returns a list of all users inside of an array called `data`.

`/users/:id` - where `:id` is the id of a `user` resource. The resource is then returned in JSON format.

#### `POST`
`/users` - Creates a new `user` resource based on the payload of the request.

#### `DELETE`
`/users/:id` - Delete a user resouce matching the `:id` specified.

#### `PUT`
`/users` - Update a user based on the payload of the request

##

The Client can be accessed by hitting the document root:

`localhost:8080/` Will send you to the application.

The Server can be accessed by hitting the document root:

`localhost:3000/` Will send you to the build client application.
