const express = require('express');
const db = require('../models/index');
const router = express.Router();

router.get('/', async (req,res,next) => {
  try{
    const data = await db.Data.findAll({
      
    })
  } catch(error){
    return next(error);    
  }
})

module.exports = router;