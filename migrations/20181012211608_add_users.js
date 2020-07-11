exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function (table) {
    table.increments('id').notNullable();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
