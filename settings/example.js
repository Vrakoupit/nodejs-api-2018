'use strict';

module.exports = {
    database: 'YOUR_DATABASE',
    http: { 
        host: 'YOUR_HOST', 
        port: 'YOUR_PORT',
        routes: {
            cors: {
                origin: ['YOUR_AUTHORIZED_URL']
            }
        }
    }
}