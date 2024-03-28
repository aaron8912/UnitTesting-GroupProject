require("dotenv").config();

const configurations = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
        // MongoDBTest is used for checking our unit tests,
        // safer to use a different database to avoid affecting data from our original database.
        mongoDBTest: process.env.CONNECTION_STRING_MONGODB_TEST
    },
    Authentication: {
        GitHub: {
            ClientId: process.env.GITHUB_CLIENT_ID,
            ClientSecret: process.env.GITHUB_CLIENT_SECRET,
            CallbackUrl: process.env.GITHUB_CLIENT_CALLBACK_URL
        }
    }
}

module.exports = configurations;