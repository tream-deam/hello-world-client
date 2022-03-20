const socketio = require("socket.io");

const listen = function (httpServer) {
  const server = socketio(httpServer, {
    pingTimeout: 60000,
    transports: [ "websocket", "polling" ],
    cors: {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST"]  
    }
  });

  const users = {};

  let connectionCount = 0;

  server.on("connection", (socket) => {
    connectionCount = connectionCount + 1;
    console.log("Client connected! ", { id: socket.id, connectionCount });
    server.emit("connected_user", { roomCount: connectionCount });
    
    // Relays real time transcription data
    socket.on("interimListen", (msg) => {
      // broadcast to all clients except sender. Be mindful of 'server' vs. 'socket' here as using the wrong one can break app.
      // server.emit would sent to everyone including sender
      console.log('msg:', msg)
      // if incoming message is empty:
      if (Object.keys(msg).length === 0) {
        setTimeout(() => {
          console.log('2000ms delay for interim msg without content')
          socket.broadcast.emit("interimListen", msg);
        }, 2000);
      } else {
        setTimeout(() => {
          console.log('1000ms delay for interim msg with content')
          socket.broadcast.emit("interimListen", msg);
        }, 1000);
      }
    });
    
    // Relays transcription data after a sentence is finished
    socket.on("transcriptionFinish", (msg) => {
      socket.broadcast.emit("transcriptionFinish", msg);
    });
    
    socket.on("sendName", (userName) => {
      users[connectionCount] = userName; 
      socket.name = userName;

      console.log(users);
      server.emit("receiveNameInClient", users);
    });
    
    socket.on("disconnect", () => {
      // remove user property
      users[connectionCount] = null;
      delete users[connectionCount];
      connectionCount = connectionCount - 1;
      server.emit("disconnected_user", { user: socket.name, roomCount: connectionCount });
  
      console.log("user disconnected,", connectionCount);
      console.log(users);
    });
  });
};

module.exports = { listen };
