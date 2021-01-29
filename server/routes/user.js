const express = require('express');
const db = require('../models/index');

const router = express.Router();

router.post("/register", (req,res) => {
  if(req.body.username && req.body.password){
    // check if the username already exsists
    db.User.findOne({
      where:{
        username:req.body.username
      }
    }).then((user) => {
      if(user){
        // username already exists
        res.status(400).send(JSON.stringify({error:"user already exists"}));
      } else {
        // username is OK
        db.User.hashPassword(req.body.password)
        .then((password)=>{
          // create the user
          db.User.create({
            username:req.body.username,
            password: password,
          })
          .then(() => {
            res.sendStatus(200);
            // probably send auth token here.
          })
          .catch((e) => {
            // database errror
            console.log("Error creating new user: ", e);
            res.sendStatus(500);
          })
        })
        .catch((e) => {
          // bcrypt error
          console.error("Error generating password hash: ", e);
          res.sendStatus(500);
        });

      }
    })
  }
  else {
    // bad request
    res.sendStatus(400);
  }
});

router.post("/login", (req,res) => {
  if(req.body.username && req.body.password){
    // check if the user exists
    db.User.findOne({
      where:{
        username: req.body.username
      }
    })
    .then((user) => {
      if(user){
        // validate the password
        user.checkPassword(req.body.password)
        .then((ok) => {
          if (ok){
            res.sendStatus(200); // probably send a jwt here.
          }
          else {
            res.status(404).send(JSON.stringify({error:'invalid password'}));
          }
        })
        .catch((e) => {
          //bcrypt error
          console.error("Error checking password hash: ", e);
          res.sendStatus(500);
        });
      } else {
        res.status(404).send(JSON.stringify({error:'invalid username'}));
      }
    })
    .catch((e) => {
      console.error("Error getting user from DB: ", e);
      req.sendStatus(500);
    })
  }
  else {
    // bad request
    res.sendStatus(400);
  }
})

module.exports = router;