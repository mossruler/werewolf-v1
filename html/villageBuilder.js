var villageBuilderInput = document.getElementById("villageBuilderInput");
var villageBuilderList = document.getElementById("villageBuilderList");
var villageBuilderCounter = document.getElementById("villageBuilderCounter");
var village = [];
villageBuilderInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    addVillageMember();
  }
});
function addVillageMember() {
  if (villageBuilderInput.value != "") {
    villageBuilderList.innerHTML += "<li class='list-group-item'>"+villageBuilderInput.value+"</li>";
    villageBuilderCounter.innerHTML++;
    village.push(villageBuilderInput.value);
    villageBuilderInput.focus();
  }
  villageBuilderInput.value = "";
}

function buildVillage() {
  socket.emit("Village", village.length);
  villageBuilder.style.display = "none";
  lobby.style.display = "block";
  villageSize.innerHTML = village.length;
}
