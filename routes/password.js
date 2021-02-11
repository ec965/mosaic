const express = require("express");
const router = express.Router();
const User = require('../models/users');

// update password
router.patch("/", (req,res,next) => {
  if (req.body.password && req.body.newPassword){
    if(req.body.password === req.body.newPassword) return res.sendStatus(400);

    User.findOne()
      .where("username").equals(req.user.username)
      .exec(function(err, user){
        if(err) return next(err);
        if (!user) return res.json({message: 'User does not exist.'});

        user.checkPassword(req.body.password, function(err, result){
          if (err) return next(err);
          if (!result) return res.json({message: 'Incorrect current password'});

          user.password = req.body.newPassword;
          user.save(function(err, data) {
            if(err) return next(err);
            res.json({message: 'success'});
          })
        })

      })
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;