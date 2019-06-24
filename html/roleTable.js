var roleTable = document.getElementById("roleTable");
var roleList = document.getElementById("roleList");
socket.on("Roles", function(village){
    roleList.style.display = "block";
    lobby.style.display = "none";
    for(i = 0; i < village.length; i++){
        roleTable.innerHTML += "<tr><td>"+players[i]+"</td><td>"+village[i]+"</td></tr>"
    }
});