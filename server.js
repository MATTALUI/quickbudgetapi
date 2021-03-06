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
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.set({'X-who-stole-the-cookies-from-the-cookie-jar': 'Matt'});
  next();
});

app.use('/api', api);
app.use('/public', express.static('public'));

app.get('/', (req,res,next)=>{
  res.redirect('/budget');
});

app.get('/budget', (req, res,next ) => {
  res.sendFile(path.join(`${__dirname}/budget.html`));
});

app.use('*', (req, res, next) => {
  res.sendStatus(404);
});

if (process.env.NODE_ENV !== 'production' && false) {
  let ip = '0.0.0.0';
  app.listen(port, ip, () => {
    console.log(`listening on ${ip}:${port}`);
  });
}else{
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}
