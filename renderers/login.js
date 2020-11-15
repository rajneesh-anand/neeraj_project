const electron = require("electron");
const { ipcRenderer, remote } = electron;
const axios = require("axios");

const isvalid = () => {
  let email = document.getElementById("email").value;
  let pwd = document.getElementById("password").value;

  if (email === "" || pwd === "") {
    return false;
  } else {
    return true;
  }
};

const valid = () => {
  let email = document.getElementById("nemail").value;
  let pwd = document.getElementById("npassword").value;

  if (email === "" || pwd === "") {
    return false;
  } else {
    return true;
  }
};

let form = document.querySelector("form");

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  if (isvalid()) {
    var data = new FormData(form);
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    ipcRenderer.send("login:request", loginData);
  }
});

const btnResetPwd = document.getElementById("btnResetNewPwd");

btnResetPwd.addEventListener("click", (event) => {
  event.preventDefault();
  if (valid()) {
    var data = new FormData(form);
    const resetData = {
      email: data.get("nemail"),
      password: data.get("npassword"),
    };

    axios
      .put(`http://localhost:3000/api/user`, resetData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.message);

        if (response.data.message === "Password updated successfully") {
          login_forgetPwd_toggle();
        }
      })
      .catch((error) => {
        warningDiv(error.response.data.message);
      });
  }
});

document.getElementById("resetpwd").addEventListener("click", (event) => {
  event.preventDefault();
  let x = document.getElementById("login");
  let y = document.getElementById("forgotpwd");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
});

function login_forgetPwd_toggle() {
  let x = document.getElementById("login");
  let y = document.getElementById("forgotpwd");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}

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
