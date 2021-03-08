const { ipcRenderer, remote } = require("electron");
const axios = require("axios");
var data = [];

function APICallToFetchCustomersAccount() {
  return axios
    .get(`http://localhost:3000/api/fetchcustomeraccount`)
    .then((response) => {
      data.splice(0, data.length);
      const custData = response.data.data;
      data = [...custData];

      return response.data.message;
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

function populateAccountsList() {
  APICallToFetchCustomersAccount().then((message) => {
    if (message === "success") {
      var Options = `<option value="" disabled selected>Select Contact</option>`;
      data.map(function (element, i) {
        Options =
          Options +
          `<option value='${element.mobile}'>${element.first_name}</option>`;
      });

      $("#accountList").append(Options);
    }

    $("#accountList").formSelect();
  });
}
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
  populateAccountsList();
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Escape":
      const window = remote.getCurrentWindow();
      window.close();
      break;
  }
});

function fetchContact(contactTag) {
  var x = contactTag.value;
  console.log(x);
  document.getElementById("contact").value = `91${x}`;
}

const isvalid = () => {
  let message = document.getElementById("message").value;
  let contact = document.getElementById("contact").value;

  if (message === "" || contact.length < 12) {
    return false;
  } else {
    return true;
  }
};

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (isvalid()) {
    var data = new FormData(form);

    axios
      .get(`http://localhost:3000/api/message`, {
        params: {
          message: data.get("message"),
          number: data.get("contact"),
          subject: "CCPAY",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.Error);
        alert(error.response.Error);
      });
  }
});
