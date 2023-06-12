const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAll = (req, res) => {
    knex("post")
        .where({ user_id: req.userId })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(500).json({
                message: `Unable to retrieve posts for user with ID: ${req.params.id} ${error}`,
            });
        });
}

module.exports = {
    getAll
}