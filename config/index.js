require("dotenv").config();

const config = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI,
  dbName: "test",
  clientOrigin: process.env.CLIENT_ORIGIN,
  sessionSecret: process.env.SESSION_SECRET,
};

module.exports = config;
