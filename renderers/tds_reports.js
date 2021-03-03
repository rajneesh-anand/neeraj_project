const { ipcRenderer, remote } = require("electron");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

var data = [];
var fromDate;
var toDate;
var accName;

handlebars.registerHelper("ifEqual", function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

handlebars.registerHelper("accInfo", (args) => {
  if (args === "acc") {
    return accName;
  } else if (args === "fromDate") {
    let current_datetime = new Date(`${fromDate}`);
    let formatted_date =
      current_datetime.getDate() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getFullYear();
    // console.log(formatted_date)

    return formatted_date;
  } else {
    let current_datetime = new Date(`${toDate}`);
    let formatted_todate =
      current_datetime.getDate() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getFullYear();
    // console.log(formatted_date)

    return formatted_todate;
  }
});

handlebars.registerHelper("sumDebit", function (arr) {
  // console.log(arr);
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    s = s + arr[i].Debit;
  }

  return s.toFixed(2);
});

handlebars.registerHelper("sumCredit", function (arr) {
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    s = s + arr[i].Credit;
  }

  return s;
});

var balance = 0;
handlebars.registerHelper("runningBalance", function (a) {
  console.log(a);
  let diff = a.Debit - a.Credit;
  console.log(diff);
  balance = balance + diff;
  console.log(balance);
  return balance.toFixed(2);
});

handlebars.registerHelper("formatDate", function (dateString) {
  let event = new Date(`${dateString}`);
  let month = event.getMonth();
  let date = event.getDate();
  let year = event.getFullYear();

  switch (month) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;

    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }
  return `${date} ${month} ${year}`;
});

$(document).ready(function () {
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

// document.addEventListener("DOMContentLoaded", function () {
// 	var elems = document.querySelectorAll(".datepicker");
// 	var instances = M.Datepicker.init(elems, {
// 		defaultDate: new Date(),
// 		autoClose: true,
// 		format: "dd mmm yyyy",
// 		setDefaultDate: true,
// 	});
// });

function getfromDate() {
  const elem = document.getElementById("fromDate");
  const instance = M.Datepicker.getInstance(elem);
  fromDate = formattedDate(instance.date);
}

function gettoDate() {
  const elem = document.getElementById("toDate");
  const instance = M.Datepicker.getInstance(elem);
  toDate = formattedDate(instance.date);
}

function APICallToFetchCustomersAccount() {
  return axios
    .get(`http://localhost:3000/api/fetchcustomeraccount`)
    .then((response) => {
      data.splice(0, data.length);
      const custData = response.data.data;
      data = [...custData];
      // console.log(data);
      return response.data.message;
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

// function APICallToFetchAccounts() {
//   return axios
//     .get(`http://localhost:3000/api/fetchaccounts`)
//     .then((response) => {
//       data.splice(0, data.length);
//       const custData = response.data.data;
//       data = [...custData];

//       return response.data.message;
//     })
//     .catch((error) => {
//       console.log(error.response.data.message);
//     });
// }

function populateAccountsList() {
  APICallToFetchCustomersAccount().then((message) => {
    if (message === "success") {
      var Options = `<option value="" disabled selected>Select Account</option>`;
      data.map(function (element, i) {
        Options =
          Options +
          `<option value='${element.id}'>${element.first_name}</option>`;
      });

      $("#accountList").append(Options);
    }

    $("#accountList").formSelect();
  });
}

// $("#gstRadio").on("click", () => {
//   if (document.getElementById("gstRadio").checked) {
//     $("#accountList option").remove();
//     APICallToFetchAccounts().then((message) => {
//       if (message === "success") {
//         // console.log(data);
//         var Options = `<option value="" disabled selected>Select Account</option>`;
//         data.map(function (element, i) {
//           Options =
//             Options +
//             `<option value='${element.accID}'>${element.Account_Name}</option>`;
//         });

//         $("#accountList").append(Options);
//       }

//       $("#accountList").formSelect();
//     });
//   }
// });

// $("#agentRadio").on("click", () => {
//   if (document.getElementById("agentRadio").checked) {
//     $("#accountList option").remove();
//     APICallToFetchCustomersAccount().then((message) => {
//       if (message === "success") {
//         var Options = `<option value="" disabled selected>Select Account</option>`;
//         data.map(function (element, i) {
//           Options =
//             Options +
//             `<option value='${element.id}'>${element.first_name}</option>`;
//         });

//         $("#accountList").append(Options);
//       }

//       $("#accountList").formSelect();
//     });
//   }
// });

const isValid = () => {
  let aName = document.getElementById("accountList");
  let accountName = aName.options[aName.selectedIndex].text;

  if (accountName === "Select Account") {
    return false;
  } else {
    return true;
  }
};

const genButton = document.getElementById("generate");

genButton.addEventListener("click", (event) => {
  event.preventDefault();

  var x = document.getElementById("accountList");
  accName = x.options[x.selectedIndex].text;
  let accountId = document.getElementById("accountList").value;
  if (isValid()) {
    if (document.getElementById("tdsRadio").checked) {
      printTdsLedgerPdf(accountId);
    } else {
      //   printGstLedgerPdf(accountId);
    }
  }
});

function formattedDate(dateValue) {
  const event = new Date(dateValue);
  const year = event.getFullYear();
  const month = event.getMonth() + 1;
  const getdate = event.getDate();
  return `${year}-${month}-${getdate}`;
}
