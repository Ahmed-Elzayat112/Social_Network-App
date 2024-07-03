const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const bodyParser = require("body-parser");
const corsMiddleware = require("./middleware/cors");
const errorMiddleware = require("./middleware/error");
const fileUpload = require("./middleware/file-upload");

const feedRouter = require("./routes/feed");
const authRouter = require("./routes/auth");

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(fileUpload.single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes middleware
app.use("/feed", feedRouter);
app.use("/auth", authRouter);

// Error handling middleware
app.use(errorMiddleware);

mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        console.log("Connected to database!");
        app.listen(8080);
    })
    .catch((err) => console.log(err));
