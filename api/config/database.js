const { createPool } = require("mysql");

const pool = createPool({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "raj2neo",
	database: "shipping",
	connectionLimit: 10,
	multipleStatements: true,
});

module.exports = pool;
