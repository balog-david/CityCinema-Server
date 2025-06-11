const cors = require("cors");

const corsMiddleware = cors({
  origin: process.env.CLIENT_ORIGIN,
});

module.exports = corsMiddleware;
