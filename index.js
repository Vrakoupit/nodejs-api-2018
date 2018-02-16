'use strict';

/**
 * Requirements
 */
const Hapi = require('hapi');

const env = process.env.NODE_ENV || 'development';

let settings;
try{
    settings = require(`./settings/${env}`);
} catch (err) {
    throw new Error(err);
}

/**
 *  Create a server with a host and port
 */
const server = Hapi.server(settings.http);

try{
    process.env.DB = settings.database
} catch (err) {
    throw new Error(err);
}

const knex = require('knex')
const db = knex({
    client: 'mysql',
    connection: process.env.DB
})


/***
 * Route for users
 */
server.route(require('./routes/users/getUsers'));

/***
 * Route for a specific user
 */
server.route(require('./routes/users/getUserById'));

/***
 * Route for a specific user
 */
server.route(require('./routes/users/createUser'));

/***
 * Route for a specific user
 */
server.route(require('./routes/users/updateUser'));

/***
 * Route for a specific user
 */
server.route(require('./routes/users/deleteUser'));

/***
 * Route for a specific user
 */
server.route(require('./routes/posts/getPostById'));


/**
 * Start the server
 */
async function start() {

    await server.register({
        plugin: require('./plugins/token'),
        options: {
            name: 'toto'
        }
    })

        try {
            await server.start();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }

        console.log('Server running at:', server.info.uri);
};

start();