const express = require('express');
const router = express.Router();
const queries = require('../queries.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/login', (req,res,next)=>{
  queries.getPassword(req.body.username).then((hashword)=>{
    if (hashword){
      bcrypt.compare(req.body.password, hashword,(error, match)=>{
        if(match){
          queries.getUserInfo(req.body.username).then((userInfo)=>{
            jwt.sign(userInfo, process.env.JWTSECRET,(err, token)=>{
              userInfo.authtoken = token;
              res.send(userInfo);
            });
          });
        }else{
          res.send({error: "Password incorrect"});
        }
      });
    }else{
      res.send({error: "User does not exist."});
    }
  });
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

router.post('/budgets', (req,res,next)=>{
  let budget = {
    name: req.body.budgetName,
    dateSaved: `${Date.now()}`,
    incomes: JSON.stringify(req.body.incomes),
    expenses: JSON.stringify(req.body.expenses)
  };
  queries.checkBudgetExistance(req.user.id, req.body.budgetName).then((existance)=>{
    if(existance){
      queries.updateBudget(req.user.id, budget).then((updatedBudget)=>{
        res.send(updatedBudget);
      });
    }else{
      queries.createBudget(req.user.id, budget).then((createdBudget)=>{
        res.send(createdBudget);
      });
    }
  });
});

router.delete('/budgets', (req,res,next)=>{
  queries.deleteBudget(req.user.id, req.body.name).then((deletedBudget)=>{
    res.send(deletedBudget);
  });
});

router.get('*', (req,res,next)=>{
  res.send(req.user);
});

module.exports = router;
