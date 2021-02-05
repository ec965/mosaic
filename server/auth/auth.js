const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const SecretKey = require('./secretkey');
const User = require('../models/users');

passport.use(
  'register',
  new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {

      User.findOne({'username': username}, 'username', function(err, user){
        if(err) {
          console.error("Error getting user from db: ", error);
          return done(err);
        }

        if(user){
          return done(null, false, {message:"User already exists"});
        } else {
          User.create({ username: username, password: password}, function(err, user) {
            if(err) {
              console.error("Error putting new user in DB: ", err);
              return done(err);
            }

            return done(null, user, {message: 'Registration successful'});
          });
        }
      })
  })
);

passport.use(
  'login',
  new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {

    User.findOne({'username': username}, function(err, user){
      if (err) {
        console.error("Error getting user from db: ", error);
        return done(err);
      }

      if(!user){
        return done(null, false, {message: 'Your username doesn\'t exist.'});
      }
      user.checkPassword(password, function(err, result){
        if(err){
          console.error("Error checking password hash:", err);
          return done(err);
        }
        if(!result){
          return done(null, false, {message: "Your password is invalid."});
        }
        return done(null, user, {message: "Logged in successfully."});
      })
    });
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
