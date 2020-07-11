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
    .then(budgets=>budgets);
  },
  getPublicBudget: (publicId) => {
    return knex('budgets')
    .select('*')
    .where('uuid', publicId)
    .where('public', true)
    .returning('*')
    .first()
    .then(budget=>budget);
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
    .then((user)=>{
      try{
        return  user.password;
      }catch(error){
        return false;
      }

    });
  },
  createBudget: (userId, budget)=>{
    budget.user_id = userId;
    return knex('budgets')
    .insert(budget)
    .returning('*')
    .then(budget=>budget);
  },
  updateBudget:(userId, budget)=>{
    return knex('budgets')
    .where('user_id', userId)
    .where('name', budget.name)
    .update(budget)
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
  },
  checkBudgetExistance: (userId, name)=>{
    return knex('budgets')
    .select('*')
    .where('user_id', userId)
    .where('name', name)
    .then((budgets)=>(budgets.length > 0));
  }
};
