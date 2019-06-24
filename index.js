var express = require('express');
var app = express();
var path = require('path');
var helmet = require('helmet');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Chance = require('chance');
var chance = new Chance();

var htmlPath = path.join(__dirname, 'html');
app.use(express.static(htmlPath));
app.use(helmet());

io.on('connection', function(socket){
  socket.on("Village", function (villageSize) {
    var gameCode = chance.word({ length: 5 }).toUpperCase();
    while (io.nsps['/'].adapter.rooms[gameCode] != undefined) {
      gameCode = chance.word({ length: 5 }).toUpperCase();
    }
    socket.emit("Game Code", gameCode);
    socket.gC = gameCode;
    socket.join(gameCode);
  });
  socket.on("Login", function (loginInfo) {
    loginInfo[0] = loginInfo[0].toUpperCase();
    if (io.nsps['/'].adapter.rooms[loginInfo[0]] != undefined) {
      io.to(loginInfo[0]).emit('Player Joined', loginInfo[1]);
      socket.emit("Login successful", true);
      socket.join(loginInfo[0]);
    } else {
      socket.emit("Login fail", "No games with that code");
    }
  });
  socket.on("Start",function(village) {
    var inRoom = getAllRoomMembers(socket.gC, "/");
    village = chance.shuffle(village);
    var nicks = [];
    for(var i = 0; i < inRoom.length; i++){
      if(inRoom[i]==socket.id){
        inRoom.splice(i, 1);
      }
    }
    socket.emit("Roles",village);
    for (var i = 0; i < inRoom.length; i++) {
      io.to(inRoom[i]).emit("Role",village.shift());
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


/* 'room' (string) is required
 * '_nsp' (string) is optional, defaults to '/'
 * returns an array of Socket IDs (string)
 https://joscor.com/blog/socket-io-tutorial-find-users-room/
  */

function getAllRoomMembers(room, _nsp) {
    var roomMembers = [];
    var nsp = (typeof _nsp !== 'string') ? '/' : _nsp;

    for( var member in io.nsps[nsp].adapter.rooms[room].sockets ) {
        roomMembers.push(member);
    }

    return roomMembers;
}
