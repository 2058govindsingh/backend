const express = require('express')
const { logRequestResponse } = require("./middlewares")
const { connectMongoDB } = require('./connection')
const userRouter = require('./routes/user')

const app = express()
const PORT = 8000

// Connection
connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-1').then(() => 
    console.log("MongoDB connected!")
);

// Middleware Plugin
app.use(express.urlencoded({ extended: false }))
app.use(logRequestResponse('log.txt'));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log('Server started at PORT', PORT))
