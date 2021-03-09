const express = require("express");
const path = require("path");
const expValidator = require("express-validator");
require("dotenv").config();

const app = express();

// set view engine

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// Set the static folder

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(expValidator());

const customerRouter = require(__dirname + "/routes/customer");
const userRouter = require(__dirname + "/routes/users");
const invoiceRouter = require(__dirname + "/routes/invoice");
const accountRouter = require(__dirname + "/routes/accounts");
const pdfRouter = require(__dirname + "/routes/pdfgenerator");
const messageRouter = require(__dirname + "/routes/message");
const supplierRouter = require(__dirname + "/routes/supplier");
const purchaseRouter = require(__dirname + "/routes/purchase");

app.use("/api", customerRouter);
app.use("/api", userRouter);
app.use("/api", invoiceRouter);
app.use("/api", accountRouter);
app.use("/api", pdfRouter);
app.use("/api", messageRouter);
app.use("/api", supplierRouter);
app.use("/api", purchaseRouter);

// app.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname, "../renderers/index.html"));
// });

process.on("SIGTERM", () => {
  app.close(() => {
    console.log("Server Closed");
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(` API SERVER RUNNING ON ${process.env.DB_HOST_SERVER}:${port}`)
);

module.exports = app;
