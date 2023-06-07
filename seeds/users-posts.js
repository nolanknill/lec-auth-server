// import seed data files, arrays of objects
const usersData = require('../seed-data/users');
const postsData = require('../seed-data/posts');

exports.seed = function (knex) {
  return knex('post')
    .del()
    .then(function () {
      return knex('user').del();
    })
    .then(function () {
      return knex('user').insert(usersData);
    })
    .then(() => {
      return knex('post').insert(postsData);
    });
};