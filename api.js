const express = require('express');
const router = express.Router();
const budgets = require('./routes/budgets.js');
const login = require('./routes/login.js');
const mobile = require('./routes/mobile.js');
const jwt = require('jsonwebtoken');
const queries = require('./queries.js');

router.use('/login', login);

router.use('/mobile', mobile);

const publicRoutes = [
  /^\/api\/budgets\/public\/[\w|-]*$/ // public budgets
];

router.use('*', (req,res,next) => {
  let publicRoute = false;
  publicRoutes.forEach((pattern) => {
    if (pattern.test(req.baseUrl)){
      publicRoute = true;
    }
  });

  if (publicRoute){
    next();
  }else if(req.cookies.user){
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
