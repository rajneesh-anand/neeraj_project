const electron = require("electron");
const { remote, ipcRenderer } = electron;
const axios = require("axios");

$("document").ready(function () {
  const btnClose = document.getElementById("btnClose");

  btnClose.addEventListener("click", (event) => {
    const window = remote.getCurrentWindow();
    window.close();
  });
});
var userType = "guest";
$("#cbAdmin").on("change", function () {
  if ($(this).is(":checked")) {
    switchStatus = $(this).is(":checked");
    userType = "admin";
  } else {
    switchStatus = $(this).is(":checked");
    userType = "guest";
  }
});

const isvalid = () => {
  let firstName = document.getElementById("fname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (firstName === "" || email === "" || password === "") {
    return false;
  } else {
    return true;
  }
};

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var data = new FormData(form);

  if (isvalid()) {
    accountData = {
      first_name: data.get("fname").toUpperCase(),
      last_name: data.get("lname").toUpperCase(),
      gender: data.get("gender") ? data.get("gender").toUpperCase() : "",
      mobile: data.get("mobile") ? data.get("mobile") : 0,
      password: data.get("password") ? data.get("password") : "",
      email: data.get("email") ? data.get("email") : "",
      role: userType,
    };

    axios
      .post(
        `http://localhost:3000/api/signup`,
        accountData,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        alert(response.data.message);
        $("input").val("");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
});
