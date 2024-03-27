const app = require("../app");
const request = require("supertest");
const should = require("should");
const mongoose = require("mongoose");
const Article = mongoose.model("Article");

// Testing the /GET requests
describe("testing the route /GET Methods", () => {
 
// GET articles index
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

// GET articles add
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

//GET index(home page)
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

//GET login

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

//GET register

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

//Get edit (BY ID)
describe("Get the edit articles page", () => {
  it("should be able to get the edit page", (done) => {

    const articleId = "articleId";
    request(app)
    .get(`/articles/edit/${articleId}`)
    .expect("Content-Type", /html/)
    .expect(200)
    .end((err, res) => {
      res.text.should.containEql("<title>Edit Article</title>");
      
    })

    request(app)
    .get(`/articles/edit/${articleId}`);
    done();

  });
});

//GET delete(BY ID)
describe("Get the delete article", () => {
  it("should be able to get the delete article", (done) => {

    const articleId = "articleId";
    request(app)
    .get(`/articles/delete/${articleId}`)
    .expect("Content-Type", /html/)
    .expect(200)

    request(app)
    .get(`/articles/delete/${articleId}`);
    done();

  });
});
});

// Testing the /POST Methods
describe("testing the POST routes" , () => {

 beforeEach(async () => {
  await Article.deleteMany({});
 });

  describe("POST /add" , () => {
    it("should be able to POST a new article", (done) => {

      // test article object
      const articleTest = {
        title: "testArticle",
        description: "testDescription"
      };
      request(app)
        .post("/articles/add")
        .expect(302)
        .send(articleTest)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("POST /edit" , () => {
    it("should be able to POST a new edited article", (done) => {
      const articleId = "articleId";
      request(app)
      .post(`/articles/edit/${articleId}`)
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        res.text.should.containEql("<title>Edit Article</title>"); 
      });
      request(app)
      .get(`/articles/edit/${articleId}`);
      done();
    });
  });
});
