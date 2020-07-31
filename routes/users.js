const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')

let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/signup").post((req, res) => {
  const { email, firstName, lastName, password, username } = req.body;
  //make sure that all infor is provided by new user
  if (!email || !firstName || !lastName || !password || !username) {
    return res.status(400).json({ msg: "please enter all fields for all that is holy!" });
  }
  //check to make sure that the user is not already in system
  //this needs to be refactored to search for emails and usernames seperately since they are both unique
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //if the user didn't previously exist, then we want to create the new user
    const newUser = new User({
      email,
      firstName,
      lastName,
      password,
      username,
    });
    
    newUser
      .save()
      .then(() => res.json("User added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route("/login").post((req, res) => {
  const { username, password } = req.body;
  console.log(password, username)
  if(!username || !password){
    return res.status(400).json({ msg: "please enter all fields for this, please!!! PLEASE!!!!!!!"})
  }
  let user = User.getAuthenticated(username, password)
  console.log("user", user)

})
module.exports = router;
