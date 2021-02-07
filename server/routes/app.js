const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Data = require("../models/data");

// READ
// get all a user's data
router.get("/myprojects", (req, res, next) => {
  Data.find()
    .where("username")
    .equals(req.query.username)
    .sort({ createdAt: -1 })
    .select("username title project updatedAt")
    .exec(function (err, data) {
      if (err) return next(err);

      res.json({ username: req.query.username, data: data });
    });
});

// CREATE
// insert a new data model into the db
router.post("/new", (req, res, next) => {
  if (req.user.username && req.body) {
    Data.create(
      {
        username: req.user.username,
        project: req.body.project,
        title: req.body.title,
      },
      function (err, data) {
        if (err) return next(err);

        res.json(data._id);
      }
    );
  } else {
    res.sendStatus(400);
  }
});

// UPDATE
// update data of id
router.patch("/update", (req, res, next) => {
  if (!req.body) return res.sendStatus(400);

  Data.findOne(
    {
      username: req.user.username,
      _id: req.body.project_id,
    },
    function (err, data) {
      if (err) return next(err);
      if (!data) return res.sendStatus(400);

      data.project = req.body.project;
      data.title = req.body.title;
      data.save(function (err, data) {
        if (err) return next(err);
        res.json(data._id);
      });
    }
  );
});

// get the 18 most recent projects for the home page
router.get("/recent", (req, res, next) => {
  Data.find()
    .limit(18)
    .sort({ createdAt: -1 })
    .select("username title project createdAt")
    .exec(function (err, data) {
      if (err) return next(err);

      res.json(data);
    });
});

module.exports = router;
