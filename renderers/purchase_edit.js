const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

handlebars.registerHelper("ifEqual", function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
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

function ValidateNumbers(e) {
  document.oncontextmenu = function () {
    return false;
  };
  var key = document.all ? e.keyCode : e.which;
  if (key == 8) return true;
  patron = /\d/;
  te = String.fromCharCode(key);
  return patron.test(te);
}

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

  $("input, textarea").on("keydown", function (e) {
    e.stopPropagation();
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

function formattedDate(dateValue) {
  const event = new Date(dateValue);
  const year = event.getFullYear();
  const month = event.getMonth() + 1;
  const getdate = event.getDate();
  return `${year}-${month}-${getdate}`;
}

const isvalid = () => {
  let invoice_bo = document.getElementById("invoice_no").value;
  let commision = document.getElementById("commision").value;
  let particulars = document.getElementById("particulars").value;

  if (invoice_bo === "" || commision === "" || particulars === "") {
    return false;
  } else {
    return true;
  }
};

var commision,
  sgstRate,
  cgstRate,
  igstRate,
  sgst_amount,
  cgst_amount,
  igst_amount,
  total_gst,
  total;
function GetTotal(obj) {
  commision =
    document.getElementById("commision").value === ""
      ? 0
      : document.getElementById("commision").value;
  sgstRate =
    document.getElementById("sgstRate").value === ""
      ? 0
      : document.getElementById("sgstRate").value;
  cgstRate =
    document.getElementById("cgstRate").value === ""
      ? 0
      : document.getElementById("cgstRate").value;
  igstRate =
    document.getElementById("igstRate").value === ""
      ? 0
      : document.getElementById("igstRate").value;

  sgst_amount = (parseFloat(commision) * parseFloat(sgstRate)) / 100;
  cgst_amount = (parseFloat(commision) * parseFloat(cgstRate)) / 100;
  igst_amount = (parseFloat(commision) * parseFloat(igstRate)) / 100;

  total = (
    parseFloat(sgst_amount) +
    parseFloat(cgst_amount) +
    parseFloat(igst_amount) +
    parseFloat(commision)
  ).toFixed(2);
  total_gst = (
    parseFloat(sgst_amount) +
    parseFloat(cgst_amount) +
    parseFloat(igst_amount)
  ).toFixed(2);

  document.getElementById("totalAmount").innerHTML = parseFloat(total).toFixed(
    2
  );
  document.getElementById("sgstAmount").innerHTML = parseFloat(
    sgst_amount
  ).toFixed(2);
  document.getElementById("cgstAmount").innerHTML = parseFloat(
    cgst_amount
  ).toFixed(2);
  document.getElementById("igstAmount").innerHTML = parseFloat(
    igst_amount
  ).toFixed(2);
}

let editor;

ClassicEditor.create(document.querySelector("#particulars"))
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });

var form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (isvalid()) {
    let data = new FormData(form);
    let purchaseData = {
      Invoice_Number: data.get("invoice_no"),
      Invoice_Date: formattedDate(data.get("invoice_date")),
      Commission: parseFloat(commision),
      Supplier_Name: data.get("agentName"),
      Particulars: editor.getData(),
      Igst_Rate: parseFloat(igstRate),
      Cgst_Rate: parseFloat(cgstRate),
      Sgst_Rate: parseFloat(sgstRate),
      Igst_Amount: parseFloat(igst_amount),
      Cgst_Amount: parseFloat(cgst_amount),
      Sgst_Amount: parseFloat(sgst_amount),
      TotalGst_Amount: parseFloat(total_gst),
      Total_Amount: parseFloat(total),
    };
    console.log(purchaseData);

    axios
      .put(`http://localhost:3000/api/purchase`, purchaseData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert(response.data.message);
        $("#btnSave").prop("disabled", true);
        $("#download").prop("disabled", false);
        $("#btnNew").prop("disabled", false);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
});

function dateddmmmyyyy(args) {
  let event = new Date(`${args}`);
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
}

ipcRenderer.on("fetchSuppliers", (event, data) => {
  var Options = "";
  data.map(function (element, i) {
    Options =
      Options + `<option value='${element.id}'>${element.first_name}</option>`;
  });

  $(".agentName").append(Options);
  $(".agentName").formSelect();
});

ipcRenderer.on("sendPurchaseDataForEdit", (event, data) => {
  document.getElementById("invoice_no").value = data.Invoice_Number;
  document.getElementById("invoice_date").value = dateddmmmyyyy(
    data.Invoice_Date
  );
  document.getElementById("commision").value = data.Commission;

  document.getElementById("agentName").value = data.Supplier_Name;
  document.getElementById("particulars").value = data.Particulars;
  document.getElementById("igstRate").value = data.Igst_Rate;
  document.getElementById("sgstRate").value = data.Sgst_Rate;
  document.getElementById("cgstRate").value = data.Cgst_Rate;
  document.getElementById("igstAmount").innerText = data.Igst_Amount;
  document.getElementById("cgstAmount").innerText = data.Cgst_Amount;
  document.getElementById("sgstAmount").innerText = data.Sgst_Amount;
  document.getElementById("totalAmount").innerText = data.Total_Amount;
});
