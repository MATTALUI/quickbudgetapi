const express = require('express');
const router = express.Router();
const budgets = require('./routes/budgets.js');

router.use('/budgets', budgets);

router.use('/', (req,res,next)=>{
  res.send('api');
});

module.exports = router;
