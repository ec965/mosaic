const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../models/index');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const SecretKey = require('./secretkey');

passport.use(
  'register',
  new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await db.User.findOne({
        where:{
          username:username
        }
      });

      if(user){
        done(null, false, {message:"User already exists"});
      }
      else {
        const hashedPassword = await db.User.hashPassword(password);
        const user = await db.User.create({
          username: username,
          password: hashedPassword
        });

        return done(null, user, {message: "Registration successful"});
      }
    }
    catch(error){
      done(error);
    }
  })
);

passport.use(
  'login',
  new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try{
      const user = await db.User.findOne({
        where: {
          username: username
        }
      });

      if(!user){
        return done(null, false, {message: 'Your username doesn\'t exist.'});
      }

      const validate = await user.checkPassword(password);

      if (!validate){
        return done(null, false, {message: "Your password is invalid."});
      }

      return done(null, user, {message: "Logged in successfully."});
    } 
    catch(error){
      return done(error);
    }
  })
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: SecretKey,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      }
      catch(error){
        done(error);
      }
    }
))