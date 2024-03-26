const app = require("../app");
const mongoose = require("mongoose");
const Article = mongoose.model("Article");
const User = mongoose.model("User");
const should = require("should");
const configurations = require("../configs/globals");

const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let article;
let user;
before(async () => { 
  const mongoUri = configurations.ConnectionStrings.mongoDBTest;
  console.log("connecting to test mongodb");
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();

  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe("Article model unit test", () => {
  
  beforeEach((done) => {
    article = new Article({
      title: "Title",
      description: "Article Description",
    });
    done();
  });

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

  it("should have username and password properties set correctly", (done) => {
    user.should.have.property("username").equal("username");
    user.should.have.property("password").equal("password");
    done();
  });

});

afterEach(async () => {
  try {
    await User.deleteMany({});
  } catch (err) {
    console.error(err);
  }
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

