import { Server } from "socket.io";

const io = new Server(3000, {
    //options
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

io.on("connection", (socket) => {
  
  console.log("connection")
  io.emit("someoneClicked", msg)

  socket.on("click", (msg) => {
    console.log("click", msg)
    io.emit("someoneClicked", msg)
  });

  socket.on("resetClicks", (msg) => {
    console.log("resetClicks", msg)
    io.emit("someoneResetClicks", msg)
  });

});

