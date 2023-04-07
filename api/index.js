const express = require("express");
const http = require("http");
const cors = require("cors");
const config = require("../config");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

//middleware
if (config.isVercel) {
  app.use(async (req, res, next) => {
    return next();
  });
}

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  },
});

io.on("connection", (socket) => {
  console.log(`Socket.io was connected ID: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ID: ${socket.id} joined room ID: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("receive_message", data);
    console.log("message_____sending");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port: 3001");
});
