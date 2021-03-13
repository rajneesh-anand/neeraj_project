const electron = require("electron");
const { remote, ipcRenderer } = electron;
const axios = require("axios");

$(function () {
  const btnClose = document.getElementById("btnClose");
  btnClose.addEventListener("click", (event) => {
    const window = remote.getCurrentWindow();
    window.close();
  });

  $(".datepicker").datepicker({
    defaultDate: new Date(),
    autoClose: true,
    format: "dd mmm yyyy",
    setDefaultDate: true,
  });
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Escape":
      const window = remote.getCurrentWindow();
      window.close();
      break;
  }
});

var userType = "Member";
$("#cbAdmin").on("change", function () {
  if ($(this).is(":checked")) {
    switchStatus = $(this).is(":checked");
    userType = "Admin";
  } else {
    switchStatus = $(this).is(":checked");
    userType = "Member";
  }
});

const isvalid = () => {
  let firstName = document.getElementById("fname").value;
  let email = document.getElementById("email").value;

  if (firstName === "" || email === "") {
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
    userData = {
      id: data.get("id"),
      first_name: data.get("fname").toUpperCase(),
      last_name: data.get("lname").toUpperCase(),
      gender: data.get("gender") ? data.get("gender").toUpperCase() : "",
      mobile: data.get("mobile") ? data.get("mobile") : 0,
      password: data.get("password") ? data.get("password") : "",
      email: data.get("email") ? data.get("email") : "",
      role: userType,
    };

    axios
      .put(`http://localhost:3000/api/useredit`, userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
});

ipcRenderer.on("sendUserDataForEdit", (event, data) => {
  document.getElementById("id").value = data.id;
  document.getElementById("fname").value = data.first_name;
  document.getElementById("lname").value = data.last_name;
  document.getElementById("gender").value = data.gender;
  document.getElementById("mobile").value = data.mobile;
  document.getElementById("email").value = data.email;
  data.role === "Admin"
    ? $("#cbAdmin").prop("checked", true)
    : $("#cbAdmin").prop("checked", false);
  data.role === "Admin" ? (userType = "Admin") : (userType = "Member");
});
