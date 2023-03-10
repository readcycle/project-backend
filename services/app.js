// require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const { funcErrorHandler } = require("./helper/errorHandler"); // ! re fix errorHandler

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(funcErrorHandler);

module.exports = app;
