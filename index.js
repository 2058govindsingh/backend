const express = require("express");
const path = require("path");
const { logRequestResponse } = require("./middlewares");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/static");
const { checkForAuthentication } = require("./middlewares/basicAuth.js");

const app = express();
const PORT = 8001;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(() =>
  console.log("MongoDB connected!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logRequestResponse("log.txt"));

// Routes
app.use("/api/users", checkForAuthentication, userRouter);
app.use("/", checkForAuthentication, staticRouter);
app.listen(PORT, () => console.log("Server started at PORT", PORT));
