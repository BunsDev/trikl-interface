const express = require("express");
const router = express.Router();
const signupTemplate = require("../models/signupmodels");

router.post("/signup", (req, res) => {
  const signedUpUser = new signupTemplate({
    name: req.body.name,
    telegram: req.body.telegram,
    email: req.body.email,
  });
  signedUpUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
