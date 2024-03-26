require("dotenv").config();

const configurations = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
        mongoDBTest: process.env.CONNECTION_STRING_MONGODB_TEST
    }
}

module.exports = configurations;