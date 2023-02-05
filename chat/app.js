const express = require("express");
const cors = require("cors");
const router = require("./routes");
const { connect } = require("./config/mongo");
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

connect().then(() =>
  app.listen(port, () => console.log("Chat API is listening to port", port))
);