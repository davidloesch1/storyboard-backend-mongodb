const express = require("express");
const router = express.Router();

let Plot = require("../models/plot.model");

router.route("/").get((req, res) => {
  Plot.find()
    .then((plots) => res.json(plots))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log(req.body)

  const username = req.body.username;
  const title = req.body.title;
  const blurb = req.body.blurb;
  const pov = Number(req.body.pov);
  const setting = req.body.setting;
  const genre = req.body.genre;
  const characters = req.body.characters;
  const storyPlot = req.body.storyPlot;
  const date = Date.parse(req.body.date);
  const chapters = req.body.chapters;
  const entries = req.body.entries;
  const comments = req.body.comments;
  const meta = req.body.meta;

  const newPlot = new Plot({ 
     username,
     title,
     blurb,
     pov,
     setting,
     genre,
     characters,
     storyPlot,
     date,
     chapters,
     entries,
     comments,
     meta,
   });
  console.log(newPlot)
  newPlot
    .save()
    .then(() => res.json("Plot added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;