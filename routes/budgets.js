const express = require('express');
const router = express.Router();
const queries = require('../queries.js');

router.get('/', (req,res,next)=>{
  queries.getAllBudgets().then((budgets)=>{ res.send(budgets); });
});

router.post('/', (req,res,next)=>{
  queries.createBudget(req.body).then((createBudget)=>{
    res.send(createdBudget);
  });
});

router.use('/', (req,res,next)=>{
  res.send('budget');
});

module.exports = router;
