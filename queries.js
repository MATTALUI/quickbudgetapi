const knex = require('./knex.js');
module.exports = {
  getAllBudgets: ()=>{
    return knex('budgets')
    .select('*')
    .returning('*')
    .then(budgets=>budgets);
  }
};
