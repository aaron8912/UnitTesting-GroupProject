const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const authorization = require("../extensions/authorization");

router.get("/", async (req, res, next) => {
  let articles = await Article.find().sort([["createdAt", "ascending"]]);
  res.render("articles/index", {
    title: "Blog",
    dataset: articles,
    user: req.user,
  });
});

router.get("/add", authorization, async(req, res, next) => {
  res.render("articles/add", { title: "Create A New Article", user: req.user });
});

router.post("/add", authorization, async (req, res, next) => {
  let newArticle = new Article({
    title: req.body.title,
    description: req.body.description,
  });
  await newArticle.save();
  res.redirect("/articles");
});

router.get("/edit/:_id", authorization,async (req, res, next) => {
  let articleId = req.params._id;
  let articleData = await Article.findOne({ _id: articleId });
  res.render("articles/edit", {
    title: "Edit Article",
    article: articleData,
    user: req.user,
  });
});

router.post("/edit/:_id", authorization, async (req, res, next) => {
  let articleId = req.params._id;
  await Article.findOneAndUpdate(
    { _id: articleId },
    {
      title: req.body.title,
      updatedAt: new Date(),
      description: req.body.description,
    }
  );
  res.redirect("/articles");
});

router.get("/delete/:_id",authorization, async (req, res, next) => {
  let articleId = req.params._id;
  await Article.findOneAndDelete({ _id: articleId });
  res.redirect("/articles");
});
module.exports = router;
