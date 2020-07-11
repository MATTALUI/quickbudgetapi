
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('budgets', function(table){
    table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()'));
    table.boolean('public').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('budgets', function(table){
    table.dropColumn('uuid');
    table.dropColumn('public');
  });
};
