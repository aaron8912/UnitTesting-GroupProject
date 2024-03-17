const express = require("express");
const router = express.Router();

const Article = require("../models/article");

router.get("/", async (req,res,next) => {
    let articles = await Article.find().sort([["createdAt","ascending"]]);
    res.render("articles/index",{ title: "Blog",dataset:articles});
});

router.get("/add", (req,res,next) => {
    res.render("articles/add");
});


router.post("/add", async(req,res,next) => {
    let newArticle = new Article ({
        title: req.body.title,
        description: req.body.description
    });
    await newArticle.save();
    res.redirect("/articles");
});



module.exports = router;