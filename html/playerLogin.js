var loginCode = document.getElementById("loginCode");
var loginName = document.getElementById("loginName");
var logInMessage = document.getElementById("logInMessage");
var loginErrorReason = document.getElementById("loginErrorReason");
var errorBox = document.getElementById("errorBox");
var roleReveal = document.getElementById("roleReveal");
var roleSpan = document.getElementById("role");
function login() {
  var loginInfo = [loginCode.value,loginName.value];
  socket.emit("Login",loginInfo);
  
}
socket.on("Login successful", function() {
    playerLogin.style.display = "none";
    logInMessage.style.display = "block";
});
socket.on("Login fail", function(err) {
  loginErrorReason.innerHTML = err;
  errorBox.style.display = "block";
});
socket.on("Role",function (role) {
  logInMessage.style.display = "none";
  roleReveal.style.display = "block";
  roleSpan.innerHTML = role;
});
