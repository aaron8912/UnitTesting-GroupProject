const app = require("../app");
const should = require("should");
const mongoose = require("mongoose");
const Article = mongoose.model("Article");
const User = mongoose.model("User");

let article;
let user;

describe("Article model unit test", () => {
    beforeEach((done) => {
        article = new Article ({
            title: "Title",
            description: "Article Description"
        });
        done();
    });

    it("should have title and description properties set correctly", (done) => {
        article.should.have.property("title").equal("Title");
        article.should.have.property("description").equal("Article Description");
        done();
    });
});

describe("User model unit test", () => {
    beforeEach((done) => {
        user = new User ({
            username: "username",
            password: "password"
        });
        done();
    });

    it("should have username and password properties set correctly", (done) => {
        user.should.have.property("username").equal("username");
        user.should.have.property("password").equal("password");
        done();
    });
});