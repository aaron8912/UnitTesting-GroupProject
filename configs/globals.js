require("dotenv").config();

const configurations = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
        // MongoDBTest is used for checking our unit tests,
        // safer to use a different database to avoid affecting data from our original database.
        mongoDBTest: process.env.CONNECTION_STRING_MONGODB_TEST
    }
}

module.exports = configurations;