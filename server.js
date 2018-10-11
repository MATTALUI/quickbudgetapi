const express = require('express');
const app = express();
const knex = require('./knex.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api.js');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  res.set({'X-who-stole-the-cookies-from-the-cookie-jar': 'matt'});
  next();
});

app.use('/api', api);

app.use('/', (req, res, next)=>{
  res.send('meow');
});

app.listen(port,()=>{
  console.log('listening on :'+ port);
});
