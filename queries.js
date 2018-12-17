const knex = require('./knex.js');
module.exports = {
  getAllBudgets: ()=>{
    return knex('budgets')
    .select('*')
    .returning('*')
    .then(budgets=>budgets);
  },
  getUserInfo: (userName)=>{
    return knex('users')
    .select(['id', 'firstName', 'lastName', 'username'])
    .where('username', userName)
    .first()
    .then(user=>user);
  },
  getPassword: (username)=>{
    return knex('users')
    .select('password')
    .where('username', username)
    .returning('*')
    .first()
    .then(user=>user.password);
  },
  createBudget: (budget)=>{
    return knex('budgets')
    .insert(budget)
    .returning('*')
    .then(budget=>budget);
  }
};
