const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http,{
    cors: {
        origin: "*"
    }
});
let players = [];
const cors = require("cors");

const {
    updateSocketUserConnectionData,
    deleteSocketUserConnectionData,
  } = require("./src/util/connectionDirectory");

server.use(cors());

io.on('connection', function (socket) {

    console.log('A user connected: ' + socket.id);

    // socket data init

    updateSocketUserConnectionData(
        socket.id,
        {
          userId: "null",
          room: "null",
        },
        true
      );
  
      console.log(`[CONN-REQ] ${socket.id}`);
  
      socket.on("USER-CONNECTION-REQUEST", (d) => {

        unitConnectionId = d.room;
  
        console.log(
          `[CONN-DATA] ${
            socket.id
          } Unit-Connection-Id ${unitConnectionId} Data: ${JSON.stringify(d)}`
        );  
        socket.join(socket.id);
        updateSocketUserConnectionData(socket.id, d, false);
      });
  
      socket.on("GROUP-CONNECTION-REQUEST", (d) => {
        // TODO: remove console log
  
        console.log(d);
        unitConnectionId = d.room;
  
        console.log(
          `[CONN-GP-DATA] ${
            socket.id
          } Unit-Connection-Id ${unitConnectionId} Data: ${JSON.stringify(d)}`
        );
  
        socket.join(socket.id);
        updateSocketUserConnectionData(socket.id, d, false);
      });
  
      socket.on(
        "disconnect",
        () => {
          socketUserLogger.info(`[CONN-DISC] ${socket.id}`);
          deleteSocketUserConnectionData(socket.id);
        }
        //TODO:  remove socket connection data from redis
      );


    socket.on('create-room', function () {
            
    })
    
    socket.on('join-room', function (playerName, socketRoom, isReturningBack) {
        
    })

    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    };

    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    socket.on('cardPlayed', function (gameObject, isPlayerA) {
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});
