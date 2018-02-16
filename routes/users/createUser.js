'use strict';

const tittle = require('tittle');
const db = require('../../utils/database');
const Joi = require('joi');

module.exports = {
        method: 'POST',
        path:'/users',
        config: {
            validate: {
                payload: Joi.object().keys({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    country_id: Joi.number().integer().positive().required(),
                    is_admin: Joi.boolean().default(false)
                })
            }
        },
        handler: async function (request, handler) {

            const insertQuery = db.insert(
                {
                    first_name: request.payload.first_name,
                    last_name: request.payload.last_name,
                    country_id: request.payload.country_id,
                    is_admin: request.payload.is_admin
                }
            ).into('users');
            let [userId, error] = await tittle(insertQuery);
            if(error) {
                return handler.response({
                    statusCode: 400,
                    error: 'Something bad happend ...'
                }).code(400);
            }

            const returningQuery = db.select().from('users').where({id: userId});
            let [user, returningError] = await tittle(returningQuery);
            if(returningError) {
                return handler.response({
                    statusCode: 400,
                    error: 'Something bad happend ...'
                }).code(400);
            }

            return handler.response({
                statusCode: 201,
                data: user
            }).code(201);
        }
    }