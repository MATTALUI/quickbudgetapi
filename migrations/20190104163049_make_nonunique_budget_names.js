
exports.up = function(knex, Promise) {
  return knex.schema.table('budgets', function (table) {
    table.dropUnique("name");
  });
};

exports.down = function(knex, Promise) {
};
