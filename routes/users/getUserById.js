'use strict';

const tittle = require('tittle');
const db = require('../../utils/database');
const Joi = require('joi');

module.exports = {
        method: 'GET',
        path:'/users/{id}',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.number().integer().positive().required()
                })
            }
        },
        handler: async function (request, handler) {

            const query = db.select().from('users').where({id: request.params.id});
            let [users, error] = await tittle(query);
            
            if(error) {
                return handler.response({
                    statusCode: 400,
                    error: 'Something bad happend...'
                }).code(400);
            }

            return handler.response({
                statusCode: 200,
                data: users[0]
            }).code(200);
        }
    }