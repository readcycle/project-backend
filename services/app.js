if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");andler = require("./middlewares/errorHander");
=======
const cors = require("cors");
const router = require("./routes");
const { funcErrorHandler } = require("./helper/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(funcErrorHandler);

module.exports = app;
