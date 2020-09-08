const express = require("express");
const router = express.Router();
const passport = require("passport");
const queries = require("../db/queries");
const bcrypt = require("bcrypt");
const initialize = require("../config/passport-config");
const knex = require("../db/knex");
const {
  checkIfAuthenticated,
  checkIfNotAuthenticated,
} = require("../middleware/checkAuthentication");

const getUserByEmail = (email) => queries.user.getByEmail(email);
const getUserById = (id) => queries.user.getById(id);

initialize(passport, getUserByEmail, getUserById);

router.get("/", (req, res) => {
  queries.user
    .getAll()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("baha");
  }
);
router.post("/login", (req, res) => {
  passport.authenticate(
    "local",
    {
      session: false,
      successRedirect: "/register",
      failureRedirect: "/login",
      failureFlash: true,
    },
    (err, user, info) => {
      console.log(user);
      if (err || !user) {
        return res.status(400).json({
          message: "Something is wrong, Please Try again Later",
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        return res.json({ user, token });
      });
    }
  )(req, res);
});
router.get("/register", (req, res) => {
  res.send("asd");
});
router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    queries.user
      .create({
        email: req.body.email,
        password: hashedPassword,
      })
      .then(function () {
        knex
          .select()
          .from("user")
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
