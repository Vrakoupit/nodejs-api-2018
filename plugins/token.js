'use strict';

module.exports = {
    name: 'token',
    version: '1.0.0',
    register: (request, options) => {
        // console.log('request', request);
        // console.log('options', options);

        request.events.once('finish', () => {
            console.log('titi')
        })

        return options.continue();
    }
}