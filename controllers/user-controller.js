const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
  knex('user')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Users: ${err}`)
    );
};

const findOne = (req, res) => {
  knex("user")
    .where({ id: req.params.id })
    .then((usersFound) => {

      if (usersFound.length === 0) {
        return res
          .status(404)
          .json({ message: `User with ID: ${req.params.id} not found` });
      }

      const userData = usersFound[0];

      res.status(200).json(userData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve user data for user with ID: ${req.params.id}`,
      });
    });
}

const posts = (req, res) => {
  knex("user")
    .join("post", "post.user_id", "user.id")
    .where({ user_id: req.params.id })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: `Unable to retrieve posts for user with ID: ${req.params.id} ${error}`,
      });
    });
}

const add = (req, res) => {
  const { name, email, password } = req.body
  
  knex("user")
    .insert({
      name,
      email,
      password
    })
    .then((result) => {
      return knex("user")
        .where({ id: result[0] })
    })
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Unable to create new user"
      });
    })

}

const update = (req, res) => {
  const { name, email, password } = req.body

  knex("user")
    .where({ id: req.params.id })
    .update({
      name,
      email,
      password
    })
    .then(() => {
      return knex("user").where({
        id: req.params.id,
      });
    })
    .then((updatedUser) => {
      res.json(updatedUser[0]);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: `Unable to update user with ID: ${req.params.id}` });
    });
}

const remove = (req, res) => {
  knex("user")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `User with ID: ${req.params.id} to be deleted not found.`,
        });
      }

      // no content response
      res.sendStatus(204);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete user" });
    });
};

module.exports = {
  index,
  findOne,
  posts,
  add,
  update,
  remove
}