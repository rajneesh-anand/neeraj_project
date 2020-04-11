const { create } = require("../services/accounts");
const pool = require("../config/database");

module.exports = {
	createAccount: (req, res) => {
		const body = req.body;
		const reg = {
			account_name: body.account_name,
		};

		pool.query(
			"SELECT COUNT(*) AS cnt FROM create_accounts WHERE Account_Name = ? ",
			[reg.account_name],
			(err, data) => {
				if (err) {
					return res.status(403).json({
						error: err,
					});
				}
				if (data[0].cnt > 0) {
					return res.status(403).json({
						message: "Account already exists !",
					});
				}

				create(body, (err, results) => {
					if (err) {
						return res.status(500).json({
							success: 0,
							message: "Database connection error !",
						});
					}
					return res.status(200).json({
						message: "Account saved successfully !",
						data: results,
					});
				});
			}
		);
	},

	fetchAccounts: (req, res) => {
		pool.query(
			"SELECT id,Account_Name from create_accounts",
			[],
			(err, results) => {
				if (err) {
					return res.status(403).json({
						error: err,
					});
				} else {
					return res.status(200).json({
						message: "All Accounts",
						data: results,
					});
				}
			}
		);
	},
	createPayment: (req, res) => {
		const data = req.body;
		pool.query(
			`insert into payments(EntryDate,Credit_Account,Credit_Amount,Debit_Account,Debit_Amount,EntryType,ChequeNumber,BankName,Comments) 
            values(?,?,?,?,?,?,?,?,?)`,
			[
				data.date,
				data.creditAccount,
				data.creditAmount,
				data.debitAccount,
				data.debitAmount,
				data.entryType,
				data.chequeNumber,
				data.bankName,
				data.remarks,
			],
			(error, results, fields) => {
				if (error) {
					return res.status(403).json({
						error: error,
						message: "Error : Transaction not successful",
					});
				} else {
					return res.status(200).json({
						message: "Transaction done successfully !",
						data: results,
					});
				}
			}
		);
	},
	createReceipt: (req, res) => {
		const data = req.body;
		pool.query(
			`insert into recieve(EntryDate,Credit_Account,Credit_Amount,Debit_Account,Debit_Amount,EntryType,ChequeNumber,BankName,Comments) 
            values(?,?,?,?,?,?,?,?,?)`,
			[
				data.date,
				data.creditAccount,
				data.creditAmount,
				data.debitAccount,
				data.debitAmount,
				data.entryType,
				data.chequeNumber,
				data.bankName,
				data.remarks,
			],
			(error, results, fields) => {
				if (error) {
					return res.status(403).json({
						error: error,
						message: "Error : Transaction not successful",
					});
				} else {
					return res.status(200).json({
						message: "Transaction done successfully !",
						data: results,
					});
				}
			}
		);
	},
};
