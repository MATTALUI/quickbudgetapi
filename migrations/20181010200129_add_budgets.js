exports.up = function(knex, Promise) {
  return knex.schema.createTable("budgets", function (table) {
    table.increments('id').notNullable();
    table.string('name').notNullable().unique();
    table.bigInteger('dateSaved').notNullable();
    table.json('expenses').notNullable();
    table.json('incomes').notNullable();
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable("budgets");
};
