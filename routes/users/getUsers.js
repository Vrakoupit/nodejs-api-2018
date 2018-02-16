'use strict';

const tittle = require('tittle');
const db = require('../../utils/database');
const Joi = require('joi');

/**
 * Route writen with async/await and tittle
 */
module.exports = {
        method: 'GET',
        path:'/users',
        config: {
            validate: {
                query: Joi.object().keys({
                    page: [
                        Joi.number().integer().positive().required(),
                        Joi.string().required()
                    ]
                })
            }
        },
        handler: async function (request, handler) {
            const page = parseInt(request.query.page) - 1;

            const query = db.select().from('users').limit(10).offset(page*10);
            let [users, error] = await tittle(query);
            
            if(error) {
                return handler.response({
                    statusCode: 400,
                    error: 'Something bad happend...'
                }).code(400);
            }

            return handler.response({
                statusCode: 200,
                data: users,
                links: {
                    prev: page ? `http://localhost:8000/users?page=${page}` : null,
                    next: `http://localhost:8000/users?page=${page + 2}`
                }
            }).code(200);
        }
    }