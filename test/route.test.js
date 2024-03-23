const app = require("../app");
const request = require("supertest");
const should = require("should");


let articleId;

describe("testing the get index method", () => {
  
  it("should be able to get the articles index page", (done) => {
  
    request(app)
      .get("/articles/")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.text.should.containEql("<title>Blog</title>");
        done();
      });
  });
});

describe("Get articles add page" , () => {


  it("should be able to get the articles add page", (done) => {
    request(app)
      .get("/articles/add")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.text.should.containEql("<title>Create A New Article</title>");
        done();
      });
  });
});

describe("Get index page" , () => {
  it("should be able to get the home page", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.text.should.containEql("<title>Everyday Insights</title>");
        done();
      });
  });
});

describe("Get the login page" , () => {
  it("should be able to get the login page", (done) => {
    request(app)
      .get("/login")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.text.should.containEql("<title>Login</title>");
        done();
      });
  });
});

describe("Get the register page" , () => {
  it("should be able to get the register page", (done) => {
    request(app)
      .get("/register")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.text.should.containEql("<title>Create a new account</title>");
        done();
      });
  });
});
