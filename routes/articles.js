const express = require("express");
const router = express.Router();

const Article = require("../models/article");

router.get("/", async (req,res,next) => {
    let articles = await Article.find().sort([["createdAt","ascending"]]);
    res.render("articles/index",{ title: "Blog",dataset:articles});
});



router.get("/add", (req,res,next) => {
    res.render("articles/add",{title: "Create A New Article"});
});


router.post("/add", async(req,res,next) => {
    let newArticle = new Article ({
        title: req.body.title,
        description: req.body.description
    });
    await newArticle.save();
    res.redirect("/articles");
});

router.get("/edit/:_id", async (req,res,next) => {
    let articleId = req.params._id;
    let articleData = await Article.findOne({_id: articleId});
    res.render("articles/edit", {
        title: "Edit Article",
        article: articleData
    });
});

router.post("/edit/:_id", async(req,res,next) => {
    let articleId = req.params._id;
    await Article.findOneAndUpdate(
        {_id: articleId},
        {
            title: req.body.title,
            updatedAt: new Date(),
            description: req.body.description
        }
    );
    res.redirect("/articles");
});

router.get("/delete/:_id", async (req,res,next) => {
    let articleId = req.params._id;
    await Article.findOneAndDelete({_id: articleId});
    res.redirect("/articles");
})
module.exports = router;