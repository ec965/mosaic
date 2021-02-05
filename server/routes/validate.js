const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/', (req, res, next) => {
  if(!req.user) return res.sendStatus(404);

  User.findById(req.user._id, function(err, user){
    if(err) return next(err);

    if(!user) return res.sendStatus(404);

    return res.sendStatus(200);
  })
})

module.exports = router;