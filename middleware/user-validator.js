const knex = require('knex')(require('../knexfile'));

const validateUser = (req, res, next) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({
            message: "User requires name and email fields"
        })
    }

    // Validate unique email
    knex("user")
        .where({ email: req.body.email })
        .then((users) => {
            if (users.length !== 0) {
                return res.status(400).json({
                    message: "Email already exists."
                });
            }

            next();
        });
}

module.exports = {
    validateUser
}