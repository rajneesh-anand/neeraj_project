const electron = require("electron");
const { ipcRenderer, remote } = electron;

const isvalid = () => {
  let email = document.getElementById("email").value;
  let pwd = document.getElementById("password").value;

  if (email === "" || pwd === "") {
    return false;
  } else {
    return true;
  }
};

let form = document.querySelector("form");

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", (event) => {
  if (isvalid()) {
    var data = new FormData(form);
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    ipcRenderer.send("login:request", loginData);
  }
});

function warningDiv(msg) {
  var x = document.getElementById("alert");
  if (x.style.display === "none") {
    x.style.display = "block";
    x.innerText = msg;
  } else {
    x.style.display = "none";
  }
}

ipcRenderer.on("login:response", (event, message) => {
  if (message === "login success") {
    ipcRenderer.send("home:window");
    const window = remote.getCurrentWindow();
    window.close();
  } else {
    warningDiv(message);
  }
});
