const express = require('express');
const router = express.Router();
const budgets = require('./routes/budgets.js');
const login = require('./routes/login.js');

router.use('/budgets', budgets);

router.use('/login', login);

router.use('/', (req,res,next)=>{
  res.send('api');
});

module.exports = router;
