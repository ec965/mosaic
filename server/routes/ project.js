const express = require('express');
const router = express.Router();
const Data = require("../models/data");

// URL/project?id=ID
/*
{
    "project": {
        "dimension": 4,
        "pixelSize": 30,
        "borderRadius": 25,
        "rmin": 0,
        "rmax": 255,
        "gmin": 0,
        "gmax": 26,
        "bmin": 0,
        "bmax": 255,
        "sortHueRow": false,
        "sortHueCol": false,
        "sortHueColLen": 10,
        "sortHueRowLen": 10
    },
    "_id": "6019e716441e0207e54c18d6",
    "username": "demo_user",
    "title": "test123141",
    "updated": "2021-02-03T00:31:31.008Z",
    "comments": [
        {
            "edited": false,
            "_id": "6019e7ca4699920a734cd908",
            "username": "test",
            "text": "text",
            "updated": "2021-02-03T00:31:31.008Z"
        },
        {
            "edited": true,
            "_id": "6019ee7399e71220ea866183",
            "username": "test",
            "text": "updated comment",
            "updated": "2021-02-03T00:31:31.008Z"
        }
    ],
    "__v": 0
}
*/
// get a specific project
router.get('/', (req, res, next) => {
  if(req.user.username && req.query.id){
    Data.findOne().
      where('_id').
      equals(req.query.id).
      exec(function(err, data){
        if(err) return next(err);
        res.status(200).send(data);
      })
  } else {
    res.sendStatus(400);
  }
});
/*
{
  project_id: "id",
  text: "comment text",
}
*/
//post a comment 
router.post('/comment', (req,res,next)=>{
  if(req.user.username && req.body.project_id&& req.body.text){
    Data.findOne().
      where('_id').
      equals(req.body.project_id).
      exec(function(err, data){
        if(err) return next(err);

        data.comments.push({
          username: req.user.username,
          text: req.body.text,
        });

        const newComment = data.comments[data.comments.length-1];
        data.save(function(err) {
          if (err) return next(err);
          res.json(newComment);
        })
      })
  } else {
    res.sendStatus(400);
  }
})
/*
{
    "project_id": "6019e716441e0207e54c18d6",
    "comment":{
        "id":"6019ee7399e71220ea866183",
        "text" : "updated comment"
    }
}
*/
// edit a comment
router.patch('/edit_comment', (req,res,next) => {
  if(req.body.project_id && req.body.comment.id && req.body.comment.text){
    // find the piece of data
    Data.findOne(
      {_id: req.body.project_id},
      function(err, data){
        if(err) return next(err);

        // update the comment
        const comment = data.comments.id(req.body.comment.id);
        comment.text = req.body.comment.text;
        comment.edited = true;

        // save the data
        data.save(function(err){
          if(err) return next(err);

          res.json(comment);
        });
      }
    );
  } else {
    res.sendStatus(400);
  }
})

// DELETE
// delete data of id
router.delete('/delete', (req, res, next) => {
  if(req.body.id){
    Data.deleteOne({_id: req.body.id}, function(){
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
})

module.exports=router;