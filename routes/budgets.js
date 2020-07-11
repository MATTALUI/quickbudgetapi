const express = require('express');
const router = express.Router();
const queries = require('../queries.js');

router.get('/', (req,res,next)=>{
  queries.getUserBudgets(req.user.id).then((budgets)=>{ res.send(budgets); });
});

router.get('/public/:publicBudgetId', (req,res,next)=>{
  queries.getPublicBudget(req.params.publicBudgetId).then((budget)=>{ res.send(budget); });
});

router.post('/', (req,res,next)=>{
  queries.createBudget(req.user.id, req.body).then((createdBudget)=>{
    res.send(createdBudget);
  });
});

router.delete('/',(req, res,next)=>{
  queries.deleteBudget(req.user.id, req.body.name).then((deletedBudget)=>{
    res.send(deletedBudget);
  });
});

router.use('/', (req,res,next)=>{
  res.send('budget');
});

module.exports = router;
