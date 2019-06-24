var connectedCount = document.getElementById("connectedCount");
var villageSize = document.getElementById("villageSize");
var gameCode = document.getElementById("gameCode");
var playerList = document.getElementById("playerList");
var startButton = document.getElementById("startButton");
var players = [];
socket.on("Game Code", function (code) {
  gameCode.innerHTML = code;
})
socket.on("Player Joined", function (player) {
  players.push(player);
  playerList.innerHTML += "<li class='list-group-item'>"+player+"</li>";
  connectedCount.innerHTML++;
  if (connectedCount.innerHTML >= villageSize.innerHTML) {
    startButton.disabled = false;
  }
})

function start() {
  socket.emit("Start", village);
  startButton.disabled = true;
}
