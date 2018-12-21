const knex = require('./knex.js');
module.exports = {
  getAllBudgets: ()=>{
    return knex('budgets')
    .select('*')
    .returning('*')
    .then(budgets=>budgets);
  },
  getUserBudgets: (userId)=>{
    return knex('budgets')
    .select('*')
    .where('user_id', userId)
    .returning('*')
    then(budgets=>budgets)
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
  createBudget: (userId, budget)=>{
    budget.user_id = userId;
    return knex('budgets')
    .insert(budget)
    .returning('*')
    .then(budget=>budget);
  },
  deleteBudget: (userId, budgetName)=>{
    return knex('budgets')
    .where('user_id', userId)
    .where('name', budgetName)
    .del()
    .returning("*")
    .then(del=>del[0]);
  }
};
