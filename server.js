const express = require("express");
const http = require("http");
const config = require("./config");

// Routes
const websocket = require("./websocket");
const moviesRouter = require("./routes/movies");
const screeningsRouter = require("./routes/screenings");
const authRouter = require("./routes/auth");
const roomsRouter = require("./routes/rooms");
const sendmailRouter = require("./routes/sendmail");

// Seeds
const runSeeds = require("./seeds");

// MongoDB
const connectDB = require("./db");

// App init
const app = express();
const port = config.port;

// Middlewares
const corsMiddleware = require("./middlewares/cors");
const tokenMiddleware = require("./middlewares/tokenMiddleware");

// Middleware setup
app.use(corsMiddleware);
app.use(express.json());
app.use(tokenMiddleware);

// Session setup
const sessionMiddleware = require("./config/session");
app.use(sessionMiddleware);

// Routers
app.use("/movies", moviesRouter);
app.use("/screenings", screeningsRouter);
app.use("/auth", authRouter);
app.use("/rooms", roomsRouter);
app.use("/sendmail", sendmailRouter);

// HTTP & WebSocket server
const server = http.createServer(app);
websocket(server);

// Start server
(async () => {
  await connectDB(config.mongoURI);
  await runSeeds();
  server.listen(port, () => {
    console.log(`🚀 Szerver fut: http://localhost:${port}`);
  });
})();
