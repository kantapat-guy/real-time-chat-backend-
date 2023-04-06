const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket.io was connected ID: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User disconnected".socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port: 3001");
});
