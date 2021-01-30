const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const SecretKey = require('../auth/secretkey');

const router = express.Router();

router.post("/register", 
  passport.authenticate('register', {session:false}),
  async (req,res,next) => {
    res.status(200).json({
      message: 'Registration successful',
      user: req.user.username
    });
  }
);

router.post("/",
  async (req,res,next) => {
    passport.authenticate('login',
    async(err, user, info) => {
      try{
        if (err || !user) {
          const error = new Error('An error occured');

          return next(error);
        }

        req.login( user,{session:false}, async(error) => {
            if(error) return next(error);

            const body = {_id: user._id, username: user.username};
            const token = jwt.sign({user: body}, SecretKey);

            return res.status(200).json({token})
          }
        );
      }
      catch(error){
        return next(error);
      }
    }
  )(req, res, next);
  }
)

module.exports = router;