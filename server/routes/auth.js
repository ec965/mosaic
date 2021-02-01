const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const SecretKey = require('../auth/secretkey');

const router = express.Router();

router.post("/register", 
  passport.authenticate('register', {session:false}),
  (req,res) => {
    res.status(200).json({
      message: 'Registration successful',
      user: req.user.username
    });
  }
);

router.post("/login",
  (req,res,next) => {
    passport.authenticate('login',
    (err, user, info) => {
      if (err) {
        const error = new Error("An error occured while logging in.");
        return next(error);
      }
      if(!user){
        res.json(info);
        return;
      }

      req.login( user,{session:false}, (error) => {
          if(error) return next(error);

          const body = {_id: user._id, username: user.username};
          const token = jwt.sign({user: body}, SecretKey);

          return res.status(200).json({token})
        }
      );
    }
  )(req, res, next);
  }
)

module.exports = router;