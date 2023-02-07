const express = require("express");
const cors = require("cors");
const router = require("./routes");
const { connect } = require("./config/mongo");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: { origin: true },
});
const port = process.env.PORT || 3001;
const errorHandler = require("./middlewares/errorHandler");

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("setup", (userData) => {
    console.log(userData);
    // socket.join(userData.id);
    socket.emit("connected");
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler);

connect().then(() =>
  http.listen(port, () => console.log("Chat API is listening to port", port))
);
