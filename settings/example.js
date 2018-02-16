'use strict';

module.exports = {
    database: 'example://example:example@localhost:3306/example',
    http: { 
        host: 'localhost', 
        port: 8000,
        routes: {
            cors: {origin: ['*']
            }
        }
    }
}