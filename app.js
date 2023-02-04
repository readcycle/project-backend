if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const { funcErrorHandler } = require("./helper/errorHandler");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(funcErrorHandler);
module.exports = app;

// app.listen(PORT, () => console.log(`Listening to port : ${PORT}`));
