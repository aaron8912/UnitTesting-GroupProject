var express = require("express");
var router = express.Router();
const User = require("../models/user");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Everyday Insights", user: req.user });
});

router.get("/login", (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { title: "Login", messages: messages });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/articles",
    failureRedirect: "/login",
    failureMessage: "Invalid Credentials",
  })
);

router.get("/register", (req, res, next) => {
  res.render("register", { title: "Create a new account" });
});

router.post("/register", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (err, newUser) {
      if (err) {
        console.log(err);
        res.render("error", {
          message: "registration information is not valid",
        });
      } else {
        req.login(newUser, function (err) {
          res.redirect("/articles");
        });
      }
    }
  );
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res, next) => {
    res.redirect("/articles");
  }
);

module.exports = router;
