
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
  .del()
  .then(function () {
    return knex('users').insert([
      {
        id: 1,
        firstName: 'Matthew',
        lastName: 'Hummer',
        password: '$2a$10$GL4KZjKjhYBFfE.ZRmKq0OayoO2uFvgErFpA26UsLISCRhDYSdYAO',
        username: 'mattalui'
      }
    ]);
  })
  .then(function(){
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
  });
};
