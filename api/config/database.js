const { createPool } = require("mysql");

const pool = createPool({
	host: process.env.DB_HOST_SERVER,
	port: 3306,
	user: "root",
	password: "raj2neo",
	database: "shipping",
	connectionLimit: 10,
	multipleStatements: true,
});

module.exports = pool;

// user grant comand

// CREATE USER 'root'@'203.0.113.2' IDENTIFIED BY 'root_password';
// GRANT ALL PRIVILEGES ON *.* TO 'root'@'203.0.113.2' WITH GRANT OPTION;
// FLUSH PRIVILEGES;
