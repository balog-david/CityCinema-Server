const cors = require("cors");

const corsMiddleware = cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
});

module.exports = corsMiddleware;
