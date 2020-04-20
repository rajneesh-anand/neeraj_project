const { createPool } = require("mysql");
// require("dotenv").config();

const pool = createPool({
	host: process.env.DB_SERVER_HOST,
	port: 3306,
	user: "root",
	password: "raj2neo",
	database: "shipping",
	connectionLimit: 10,
	multipleStatements: true,
});

module.exports = pool;
