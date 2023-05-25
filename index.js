import { json } from "express";
import { Server } from "socket.io";

let clickCount = 0

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

  socket.on("friendlyNameUpdate",  (newName) =>{

    const payload = {
      totalClicks: clickCount,
      whoClicked: socket.id
    }
    var payloadAsString = JSON.stringify(payload)
    var parsedPayload = JSON.parse(payload)
    console.log(typeof parsedPayload)
    console.log(JSON.stringify(payload))
    console.log(newName)
    var oldName = JSON.stringify(socket.id)
    for (var i = 0; i < Object.keys(payload).length; i++){
      console.log("Attempting " + parsedPayload[i] + " Name Update...")
      if(oldName == payload[whoClicked][i]){
        payload[whoClicked][i] = newName
        print(oldName+" name successfully changed to " + newName)
      }
      else{
        console.log("Change unsuccessful. Attempting next...")
      }
    }
    
  });

});

