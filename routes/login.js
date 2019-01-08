const express = require('express');
const router = express.Router();
const queries = require('../queries.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/info', function(req,res,next){
  if (req.cookies.user){
    jwt.verify(req.cookies.user, process.env.JWTSECRET, (error, data)=>{
      if (error){
        return res.send({error});
      }
      queries.getUserInfo(data.username).then((user)=>{
        return res.send(user);
      });
    });
  }else{
    return res.send({error: "You are not logged in."});
  }
});


// router.get('/', function(req,res,next){
//   if(req.cookies.user){
//     jwt.verify(req.cookies.user, process.env.JWTSECRET, (error,decoded)=>{
//       if(error){
//         res.send(false);
//       }else{
//         res.send(true);
//       }
//     });
//   }else{
//     res.send(false);
//   }
// });
//
//
//
router.post('/',function(req,res,next){
  queries.getPassword(req.body.userName).then((hashword)=>{
    if(hashword){
      bcrypt.compare(req.body.password, hashword,(error, match)=>{
        if (match) {
          // console.log(match);
          queries.getUserInfo(req.body.userName).then((user)=>{
            // console.log(user);
            jwt.sign(user, process.env.JWTSECRET,(err, token)=>{
              res.cookie('user', token, {httpOnly: true});
              // queries.getUserInfo(user.userName).then((user)=>{
              //   console.log(user);
              // console.log(res.cookie.user);
                return res.send(user);
              // });
            });
          });
        }else{
          res.clearCookie('user');
          res.send(false);
        }
      });
    }else{
      res.send(false);
    }
  });
});
//
//
// router.patch('/', function(req,res,next){
//   jwt.verify(req.cookies.user, process.env.JWTSECRET, (error, data)=>{
//     if (error){
//       res.set('Access-Control-Allow-Origin', host);
//       res.clearCookie('user');
//       res.sendStatus(401);
//     }else{
//       queries.getPassword(data.name).then((hashword)=>{
//         bcrypt.compare(req.body.current, hashword, (error, match)=>{
//           if(match){
//             bcrypt.genSalt(10, function(err, salt) {
//                 bcrypt.hash(req.body.new, salt, function(err, hash) {
//                   queries.changePassword(data.name, hash).then(()=>{
//                     let message = {
//                       text: 'Password Changed',
//                       class: 'success'
//                     }
//                     res.send(message);
//                   })
//                 });
//             });
//           }else{
//             let message = {
//               text: 'Password Incorrect',
//               class: 'error'
//             }
//             res.send(message);
//           }
//
//
//
//
//
//         });
//       });
//     }
//   });
// });

router.delete('/',function(req,res,next){
  res.clearCookie('user');
  res.send(true);
});

module.exports = router;
