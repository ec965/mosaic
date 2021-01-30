const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: "This is secure",
    user: req.user,
    token: req.query.secret_token
  })
})

module.exports=router;