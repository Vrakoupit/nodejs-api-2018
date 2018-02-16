'use strict';

const tittle = require('tittle');
const db = require('../../utils/database');
const Joi = require('joi');

module.exports = {
        method: 'DELETE',
        path:'/users/{id}',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.number().integer().positive().required()
                })
            }
        },
        handler: async function (request, handler) {

            const deleteQuery = db('users').where({id: request.params.id}).del();
            let [userDeleted, error] = await tittle(deleteQuery);
            if(error) {
                return handler.response({
                    statusCode: 400,
                    error: 'Something bad happend ...'
                }).code(400);
            }

            return handler.response({
                statusCode: 204,
                data: {}
            }).code(204);
        }
    }