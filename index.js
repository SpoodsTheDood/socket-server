import { json } from "express";
import { Server } from "socket.io";

let clickCount = 0

//server = http.c

const io = new Server(3000, {
    //options
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

io.on("connection", (socket) => {
  
  //create payload
  const payload = {
    totalClicks: clickCount
  }

  //payload as string
  var payloadAsString = JSON.stringify(payload)

  //log and send initial data to socket
  console.log("connection")
  socket.emit("connectComplete", payload)

  socket.on("click", () => {

    //update click counter
    clickCount += 1

    //create payload
    var payload = {
      totalClicks: clickCount,
      whoClicked: socket.id
    }

    //payload as string
    var payloadAsString = JSON.stringify(payload)

    //log and broadcast
    console.log("click", payload)
    io.emit("someoneClicked", payload)
  });

  socket.on("resetClicks", () => {

    //reset click counter
    clickCount = 0

    //create payload
    const payload = {
      totalClicks: clickCount,
      whoClicked: socket.id
    }


    //payload as string
    var payloadAsString = JSON.stringify(payload)

    //log and broadcast
    console.log("resetClicks", payload)
    io.emit("someoneResetClicks", payload)
  });

  socket.on("friendlyNameUpdate", (newName) =>{
    //testing
    console.log(newName + " received!")
    const payload = {
      totalClicks: clickCount,
      whoClicked: socket.id
    }

    payload.whoClicked = newName

    payloadAsString = JSON.stringify(payload)
    console.log(payloadAsString)
    console.log("Updating Name...")
    console.log(payload.whoClicked + " has been approved")
    socket.id = newName

    io.emit("successfulChange")
  })
})

