const app = require("../app");
const mongoose = require("mongoose"); 
const Article = mongoose.model("Article");
const User = mongoose.model("User");
const should = require("should");
const configurations = require("../configs/globals");

// import mongodb in-memory server module for testing
const { MongoMemoryServer } = require("mongodb-memory-server");

// variables made from mongserver, article, user instances
let mongoServer;
let article;
let user;

// before any test is run, the in-memory test database is set up
before(async () => { 
  const mongoUri = configurations.ConnectionStrings.mongoDBTest;
  console.log("connecting to test mongodb");
  // ensures that the original database is disconnected when running the tests
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();

  // connects to the in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});


describe("Article model unit test", () => {
  
  // initializes article instance
  beforeEach((done) => {
    article = new Article({
      title: "Title",
      description: "Article Description",
    });
    done();
  });

  // checks for article properties 
  it("should have title and description properties set correctly", (done) => {
    article.should.have.property("title").equal("Title");
    article.should.have.property("description").equal("Article Description");
    done();
  });
});

describe("testing the save method", () => {
  it("should be able to save without any problems", () => {
    article.save((err) => {
      should.not.exist(err);
    });
  });

  it("should be able to save an article without a title", () => {
    article.title = "";

    article.save((err) => {
      should.exist(err);
    });
  });
});


// after each of the tests, every instance of article is cleared
afterEach(async () => {
  try {
    await Article.deleteMany({});
  } catch (err) {
    console.error(err);
  }
});


describe("User model unit test", () => {
  beforeEach((done) => {
    user = new User({
      username: "username",
      password: "password",
    });
    done();
  });

  // checks for user properties
  it("should have username and password properties set correctly", (done) => {
    user.should.have.property("username").equal("username");
    user.should.have.property("password").equal("password");
    done();
  });

});

// after each of the tests, every instance of user is cleared
afterEach(async () => {
  try {
    await User.deleteMany({});
  } catch (err) {
    console.error(err);
  }
});
// after all the tests are run, this will disconnect from the database and stop the server
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

