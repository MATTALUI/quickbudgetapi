const express = require('express');
const router = express.Router();
const queries = require('../queries.js');
const jwt = require('jsonwebtoken');


router.post('/login', (req,res,next)=>{
  return res.send('logged in!');
});

router.use('*', (req,res,next)=>{
  jwt.verify(req.get('Authorization'), process.env.JWTSECRET, (err,data)=>{
    if(err){
      return res.send({error: "You are not logged in."});
    }
    req.user = data;
    next();
  });
});

router.get('/budgets', (req,res,next)=>{
  queries.getUserBudgets(req.user.id).then((budgets)=>{ res.send(budgets); });
});

// router.post('/', (req,res,next)=>{
//   queries.createBudget(req.user.id, req.body).then((createdBudget)=>{
//     res.send(createdBudget);
//   });
// });
//
// router.delete('/',(req, res,next)=>{
//   queries.deleteBudget(req.user.id, req.body.name).then((deletedBudget)=>{
//     res.send(deletedBudget);
//   });
// });

router.get('*', (req,res,next)=>{
  res.send(req.user);
});

module.exports = router;
