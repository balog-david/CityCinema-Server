const express = require("express");
const http = require("http");
const config = require("./config");
const path = require("path");

// Routes
const websocket = require("./websocket");
const moviesRouter = require("./routes/movies");
const screeningsRouter = require("./routes/screenings");
const authRouter = require("./routes/auth");
const roomsRouter = require("./routes/rooms");
const sendmailRouter = require("./routes/sendmail");
const ticketsRouter = require('./routes/tickets');

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

// Picture folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware setup
app.use(corsMiddleware);
app.use(express.json());

app.set("trust proxy", 1);

// Routers
app.use("/movies", moviesRouter);
app.use("/screenings", screeningsRouter);
app.use("/auth", authRouter);
app.use("/rooms", roomsRouter);
app.use("/sendmail", sendmailRouter);
app.use("/tickets", ticketsRouter);

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
