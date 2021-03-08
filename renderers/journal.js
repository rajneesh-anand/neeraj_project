const { ipcRenderer, remote } = require("electron");
const axios = require("axios");

var accounts = [];

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

const isvalid = () => {
  let aName = document.querySelector(".fromAccount");
  let bName = document.querySelector(".toAccount");
  let amount = document.getElementById("amount").value;
  let fromname = aName.options[aName.selectedIndex].text;
  let toname = bName.options[bName.selectedIndex].text;

  if (
    amount === "" ||
    amount === 0 ||
    fromname === "Select Account" ||
    toname === "Select Account"
  ) {
    return false;
  } else {
    return true;
  }
};

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let eType = document.getElementById("entry");
  let Entry = eType.options[eType.selectedIndex].text;

  if (isvalid()) {
    let data = new FormData(form);
    let paymentData = {
      date: formattedDate(data.get("payment_date")),
      entryType: Entry,
      creditAccount: data.get("fromAccount"),
      creditAmount: data.get("amount"),
      debitAccount: data.get("toAccount"),
      debitAmount: data.get("amount"),
      chequeNumber: data.get("cheque") ? data.get("cheque").toUpperCase() : "",
      remarks: data.get("comment") ? data.get("comment").toUpperCase() : "",
      bankName: data.get("bank_name")
        ? data.get("bank_name").toUpperCase()
        : "",
    };

    axios
      .post(`http://localhost:3000/api/journal`, paymentData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert(response.data.message);
        $("#bank_name").val("");
        $("#cheque").val("");
        $("#comment").val("");
        $("#amount").val("");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
});

// function getAccountBalance() {
// 	let accountId = document.getElementById("agent").value;
// 	let balanceField = document.getElementById("showBalance");
// 	console.log(accountId);

// 	axios
// 		.get(`http://localhost:3000/api/customerbalance/${accountId}`)
// 		.then((response) => {
// 			let Balance = response.data.data[0];
// 			balanceField.innerHTML = `INR { ${Balance.Balance} }`;
// 		})
// 		.catch((error) => {
// 			if (error) throw new Error(error);
// 		});
// }

function checkPaymentType(paymentTag) {
  var x = paymentTag.options[paymentTag.selectedIndex].text;

  if (x === "BANK-TRANSACTION") {
    $("#bank_name").prop("disabled", false);
    $("#cheque").prop("disabled", false);
  } else {
    $("#bank_name").val("");
    $("#cheque").val("");
    $("#bank_name").prop("disabled", true);
    $("#cheque").prop("disabled", true);
  }
}
//convert date format for database
function formattedDate(dateValue) {
  const event = new Date(dateValue);
  const year = event.getFullYear();
  const month = event.getMonth() + 1;
  const getdate = event.getDate();
  return `${year}-${month}-${getdate}`;
}

ipcRenderer.on("fetchAccounts", (event, data) => {
  accounts = [...data];

  var Options = "";
  data.map(function (element, i) {
    Options =
      Options +
      `<option value='${element.id}'>${element.Account_Name}</option>`;
  });

  $(".fromAccount").append(Options);
  $(".fromAccount").formSelect();
  $(".toAccount").append(Options);
  $(".toAccount").formSelect();
});
