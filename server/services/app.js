if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHander");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler);

module.exports = app;