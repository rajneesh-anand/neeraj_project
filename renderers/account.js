const { ipcRenderer, remote } = require("electron");
const axios = require("axios");

let accountData = {};

function isNumberKey(evt, obj) {
  var charCode = evt.which ? evt.which : event.keyCode;
  var value = obj.value;
  var dotcontains = value.indexOf(".") != -1;
  if (dotcontains) if (charCode == 46) return false;
  if (charCode == 46) return true;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

function thFormat(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

$(document).ready(function () {
  $("select").formSelect();

  const btnClose = document.getElementById("btnClose");
  btnClose.addEventListener("click", (event) => {
    remote.getCurrentWindow().close();
  });

  $(".datepicker").datepicker({
    defaultDate: new Date(),
    autoClose: true,
    format: "dd mmm yyyy",
    setDefaultDate: true,
  });
});

const isvalid = () => {
  let accountName = document.getElementById("account").value;

  if (accountName === "") {
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
    accountData = {
      date: formattedDate(data.get("payment_date")),
      prefix: "ACC",
      account_name: data.get("account").toUpperCase(),
      account_type: data.get("entryType").toUpperCase(),
      remarks: data.get("comment") ? data.get("comment").toUpperCase() : "",
      credit_opening: data.get("entry") === "1" ? data.get("amount") : 0,
      debit_opening: data.get("entry") === "2" ? data.get("amount") : 0,
      opening_balance: data.get("amount"),
    };

    axios
      .post(`http://localhost:3000/api/account`, accountData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert(response.data.message);
        $("#comment").val("");
        $("#account").val("");
        $("#amount").val("");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
});

function formattedDate(dateValue) {
  const event = new Date(dateValue);
  const year = event.getFullYear();
  const month = event.getMonth() + 1;
  const getdate = event.getDate();
  return `${year}-${month}-${getdate}`;
}

ipcRenderer.on("accountCategory", (event, data) => {
  // console.log(data);
  // states = [...data];

  var Options = "";
  data.map(function (element, i) {
    Options =
      Options +
      `<option value='${element.Cat_Name}'>${element.Cat_Name}</option>`;
  });

  $("#entryType").append(Options);
  $("#entryType").formSelect();
});
