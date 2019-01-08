const express = require('express');
const app = express();
const knex = require('./knex.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api.js');
const path = require('path');
const port = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
app.use(morgan());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  res.set({'X-who-stole-the-cookies-from-the-cookie-jar': 'matt'});
  next();
});

app.use('/api', api);
app.use('/public', express.static('public'));

app.get('/', (req,res,next)=>{
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('*', (req, res, next)=>{
  res.sendStatus(404);
});

app.listen(port,'10.37.0.112',()=>{
  console.log('listening on 10.37.0.112:'+ port);
});
