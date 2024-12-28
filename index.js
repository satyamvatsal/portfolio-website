const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const homeRouter = require("./routes/home");
const { Server } = require("socket.io");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb connected"));
const server = http.createServer(app);
const io = new Server(server);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
let totalUser = 0;

io.on("connection", (socket) => {
  totalUser++;
  io.emit("userCount", totalUser);
  console.log("a user connected");
  socket.on("disconnect", () => {
    totalUser--;
    io.emit("userCount", totalUser);
    console.log("a user disconnected");
  });
});
app.use(express.urlencoded({ extended: false }));
app.use("/", homeRouter);
app.use(express.static(path.join(__dirname, "public")));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
