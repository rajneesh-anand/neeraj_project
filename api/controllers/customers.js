const {
	create,
	fetchCustomers,
	fetchCustomerById,
	setCustomer,
} = require("../services/customers");
const pool = require("../config/database");

module.exports = {
	createCustomer: (req, res) => {
		const body = req.body;

		const reg = {
			first_name: body.first_name,
			email: body.email,
		};

		pool.query(
			"SELECT COUNT(*) AS cnt FROM customers WHERE first_name = ? and email= ?",
			[reg.first_name, reg.email],
			(err, data) => {
				if (err) {
					return res.status(403).json({
						error: err,
					});
				}
				if (data[0].cnt > 0) {
					return res.status(403).json({
						message: "Customer already exists !",
					});
				}

				create(body, (err, results) => {
					if (err) {
						console.log(err);
						return res.status(500).json({
							success: 0,
							message: "Database connection error !",
						});
					}
					return res.status(200).json({
						message: "Customer saved successfully !",
						data: results,
					});
				});
			}
		);
	},
	getCustomerslist: (req, res) => {
		pool.query(
			`SELECT concat(Prefix,id) as cusID, first_name FROM customers`,
			[],
			(error, results) => {
				if (error) {
					res.status(403).json({
						message: "Database connection error !",
						error: `Error :${error}`,
					});
				} else {
					res.status(200).json({
						message: "success",
						data: results,
					});
				}
			}
		);
	},

	getCustomers: (req, res) => {
		fetchCustomers((err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			return res.json({
				message: "success",
				data: results,
			});
		});
	},

	getCustomerById: (req, res) => {
		const id = req.params.id;
		fetchCustomerById(id, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!results) {
				return res.json({
					success: 0,
					message: "Record not Found",
				});
			}

			return res.json({
				success: 1,
				data: results,
			});
		});
	},

	getCustomerBalanceById: (req, res) => {
		const id = req.params.id;

		pool.query(
			// ` SELECT (credit - debit) as Balance FROM ( (SELECT SUM(Credit_Amount) as credit, Credit_Account FROM receive where Credit_Account = ? GROUP BY Credit_Account) as credit
			//   LEFT JOIN
			//  (SELECT SUM(Debit_Amount) as debit,Debit_Account FROM payments where Debit_Account=? GROUP BY Debit_Account) as debit
			//   ON debit.Debit_Account = credit.Credit_Account)`,

			`SELECT IFNULL( (SELECT SUM(Credit_Amount) as credit FROM receive where Credit_Account = ? GROUP BY Credit_Account),0 ) as credit;
			SELECT IFNULL( (SELECT SUM(Debit_Amount) as debit FROM payments where Debit_Account=? GROUP BY Debit_Account),0) as debit`,
			[id, id],
			(error, results) => {
				if (error) {
					return res.status(500).json({ message: error });
				}

				return res.status(200).json({
					message: "balance retrieved",
					data: results,
				});
			}
		);
	},

	updateCustomer: (req, res) => {
		const body = req.body;
		setCustomer(body, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(403).json({
					message: "Database connection error !",
				});
			}
			return res.status(200).json({
				success: 1,
				message: "updated successfully !",
			});
		});
	},

	getStates: (req, res) => {
		pool.query("SELECT id,State_Name from states", [], (err, results) => {
			if (err) {
				return res.status(403).json({
					error: err,
				});
			} else {
				return res.status(200).json({
					message: "All States",
					data: results,
				});
			}
		});
	},

	login: (req, res) => {
		const body = req.body;
		getUserByUserEmail(body.email, (err, results) => {
			if (err) {
				console.log(err);
			}
			if (!results) {
				return res.json({
					success: 0,
					data: "Password || Email doesn't match !",
				});
			}
			const result = compareSync(body.password, results.password);
			if (result) {
				results.password = undefined;
				const jsontoken = sign({ result: results }, "neosoft@1234", {
					expiresIn: "1h",
				});
				return res.json({
					success: 1,
					message: "login successfully",
					token: jsontoken,
				});
			} else {
				return res.json({
					success: 0,
					data: "Password || Email doest match !",
				});
			}
		});
	},

	deleteUser: (req, res) => {
		const data = req.body;
		deleteUser(data, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!results) {
				return res.json({
					success: 0,
					message: "Record Not Found",
				});
			}
			return res.json({
				success: 1,
				message: "user deleted successfully",
			});
		});
	},
};
