'use strict';

const tittle = require('tittle');
const db = require('../../utils/database');
const Joi = require('joi');

module.exports = {
        method: 'GET',
        path:'/posts/{id}',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.number().integer().positive().required()
                })
            }
        },
        handler: async function (request, handler) {

            const query = db.select(
                    'p.id as post_id',
                    'p.title',
                    'p.description',
                    'p.content',
                    'p.created_at as post_created_at',
                    'u.id as author_id',
                    'u.first_name as author_first_name',
                    'u.last_name as author_last_name',
                    'c.id as comment_id',
                    'c.comment'
                )
                .from('posts as p')
                .innerJoin('users as u', 'p.user_id', '=', 'u.id')
                .innerJoin('comments as c', 'p.id', '=', 'c.post_id')
                .where({'p.id': request.params.id})
            let [posts, error] = await tittle(query);
            if(error) {
                return handler.response({
                    statusCode: 400,
                    error: error
                }).code(400);
            }

            const data = {
                id: posts[0].post_id,
                title: posts[0].title,
                description: posts[0].description,
                content: posts[0].content,
                created_at: posts[0].created_at,
                author: {
                    id: posts[0].author_id,
                    first_name: posts[0].author_first_name,
                    last_name: posts[0].author_last_name
                },
                comments: []
            };

            posts.forEach(post => {
                data.comments.push({
                    id: post.comment_id,
                    comment: post.comment
                })
            })

            return handler.response({
                statusCode: 200,
                data: data
            }).code(200);
        }
    }