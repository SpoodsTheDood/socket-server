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

  socket.on("friendlyNameUpdate", (newName) =>{
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
    /*for (var i = 0; i < payload.length; i++) {
      console.log("Attempting name change of " + payload[i].whoClicked + " to " + newName)
      if (payload[i].whoClicked === oldName) {
        console.log(payload.whoClicked + " has changed their name to " + newName)
        payload[i].whoClicked = newName;
        return;
      }
      else{
        console.log("Attempt to change "+ payload[i].whoClicked+" unsuccessful. Attempting next name...")
      }
    }
    
    var oldName = payloadAsString.whoClicked
    console.log("oldName = " + oldName)
    console.log(oldName +" changed name to "+newName)
    payload.whoClicked = newName
    payloadAsString = JSON.stringify(payload) */
  });

});

