'use strict';

const tittle = require('tittle');
const db = require('../../utils/database');
const Joi = require('joi');

module.exports = {
        method: 'PUT',
        path:'/users/{id}',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.number().integer().positive().required()
                }),
                payload: Joi.object().keys({
                    first_name: Joi.string(),
                    last_name: Joi.string(),
                    country_id: Joi.number().integer().positive(),
                    is_admin: Joi.boolean().default(false)
                })
            }
        },
        handler: async function (request, handler) {

            const updateQuery = db('users').update(
                {
                    first_name: request.payload.first_name,
                    last_name: request.payload.last_name,
                    country_id: request.payload.country_id,
                    is_admin: request.payload.is_admin
                }
            ).where({id: request.params.id});
            let [userUpdated, error] = await tittle(updateQuery);
            if(error) {
                return handler.response({
                    statusCode: 400,
                    error: 'Something bad happend ...'
                }).code(400);
            }

            const returningQuery = db.select().from('users').where({id: request.params.id});
            let [user, returningError] = await tittle(returningQuery);
            if(returningError) {
                return handler.response({
                    statusCode: 400,
                    error: 'Something bad happend ...'
                }).code(400);
            }

            return handler.response({
                statusCode: 200,
                data: user
            }).code(200);
        }
    }