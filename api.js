const express = require('express');
const router = express.Router();
const budgets = require('./routes/budgets.js');
const login = require('./routes/login.js');
const mobile = require('./routes/mobile.js');
const jwt = require('jsonwebtoken');
const queries = require('./queries.js');

router.use('/login', login);

router.use('/mobile', mobile);



router.use('*', (req,res,next)=>{
  if (req.cookies.user){
    jwt.verify(req.cookies.user, process.env.JWTSECRET, (error, data)=>{
      if (error){
        return res.send({error});
      }
      queries.getUserInfo(data.username).then((user)=>{
        req.user = user;
        next();
      });
    });
  }else{
    return res.send({error: "You are not logged in."});
  }
});

router.use('/budgets', budgets);





module.exports = router;
