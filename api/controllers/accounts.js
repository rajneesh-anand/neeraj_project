const { create } = require("../services/accounts");
const pool = require("../config/database");

module.exports = {
	createAccount: (req, res) => {
		const body = req.body;
		const reg = {
			account_name: body.account_name,
		};

		pool.query(
			"SELECT COUNT(*) AS cnt FROM accounts WHERE Account_Name = ? ",
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
			"SELECT concat(Prefix,id) as id ,Account_Name from accounts",
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

	createJournal: (req, res) => {
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
						message: "Transaction done successfully ",
						data: results,
					});
				}
			}
		);
	},

	createLedger: (req, res) => {
		const accountId = req.params.id;
		pool.query(
			`SELECT EntryDate as EntryDate, EntryType, Invoice_Number, Debit_Amount as Debit, NULL as Credit FROM payments where Debit_Account =?
			UNION ALL 
			SELECT EntryDate as EntryDate,EntryType,Invoice_Number,  NULL as Debit,Credit_Amount as Credit FROM receive where Credit_Account =?
			ORDER BY EntryDate`,
			[accountId, accountId],
			(error, results, fields) => {
				if (error) {
					return res.status(403).json({
						error: error,
						message: `Error : ${error}`,
					});
				} else {
					return res.status(200).json({
						message: "Ledger Success",
						data: results,
					});
				}
			}
		);
	},

	getPaymentList: (req, res) => {
		pool.query(
			`SELECT payments.id,payments.EntryDate,payments.Debit_Account,payments.Debit_Amount,payments.EntryType,payments.ChequeNumber,customers.first_name,accounts.Account_Name FROM payments 
			LEFT JOIN customers
			ON concat(customers.Prefix,customers.id) = payments.Debit_Account
			LEFT JOIN accounts
			ON concat(accounts.Prefix,accounts.id) = payments.Debit_Account
			where payments.EntryType <>'INVOICE'
			ORDER BY payments.EntryDate`,
			[],
			(error, results) => {
				if (error) {
					return res.status(403).json({
						error: error,
						message: `Error : ${error}`,
					});
				} else {
					return res.status(200).json({
						message: "success",
						data: results,
					});
				}
			}
		);
	},

	getledgerlist: (req, res) => {
		pool.query(
			// 	`SELECT ot.Credit_Account, op.Debit_Account,	ot.Credit,op.Debit,	ot.custName,ot.city
			// 	FROM (
			// 	SELECT
			// 		r.Credit_Account, c.first_name as custName ,c.city as city,
			// 		SUM(r.Credit_Amount) AS Credit
			// 	FROM
			// 		receive r, customers c where r.Credit_Account=c.id
			// 	GROUP BY
			// 		r.Credit_Account
			// ) AS ot
			// INNER JOIN (
			// 	SELECT
			// 		Debit_Account,
			// 		SUM(Debit_Amount) AS Debit
			// 	FROM
			// 		payments
			// 	GROUP BY
			// 		Debit_Account
			// ) AS op ON (op.Debit_Account = ot.Credit_Account)
			// ;`,
			`select t.Acc,SUM(IFNULL( t.Credit, 0 )) AS Credit,SUM(IFNULL( t.Debit, 0 )) AS Debit, c.first_name,c.city from (
				select Credit_Account AS Acc,  Credit_Amount AS Credit, NULL as Debit from receive
				union
				select Debit_Account AS Acc , NULL as Credit, Debit_Amount AS Debit from payments ) as t, customers c where t.Acc = concat(c.Prefix,c.id) Group by t.Acc`,
			[],
			(error, results) => {
				if (error) {
					return res.status(403).json({
						error: error,
						message: `Error : ${error}`,
					});
				} else {
					return res.status(200).json({
						message: "success",
						data: results,
					});
				}
			}
		);
	},

	getPaymentByID: (req, res) => {
		const id = req.params.id;
		console.log(id);
		pool.query(
			`select id,EntryDate, EntryType, Debit_Account,Debit_Amount,Credit_Account,Credit_Amount, ChequeNumber,BankName,Comments from payments where id=?`,
			[id],
			(error, results, fields) => {
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

	updatePayment: (req, res) => {
		const data = req.body;
		console.log(data);
		pool.query(
			`update payments set EntryDate =?, EntryType=?, Debit_Account=?,Debit_Amount=?,Credit_Account=?,Credit_Amount=?, ChequeNumber=?,BankName=?,Comments=? where id=?`,
			[
				data.date,
				data.entryType,
				data.debitAccount,
				data.debitAmount,
				data.creditAccount,
				data.creditAmount,
				data.chequeNumber,
				data.bankName,
				data.remarks,
				data.id,
			],

			(error, results, fields) => {
				if (error) {
					res.status(403).json({
						message: "Database connection error !",
						error: `Error :${error}`,
					});
				} else {
					res.status(200).json({
						message: "Transaction Updated Successfully",
						data: results,
					});
				}
			}
		);
	},

	createReceipt: (req, res) => {
		const data = req.body;
		pool.query(
			`insert into receive(EntryDate,Credit_Account,Credit_Amount,Debit_Account,Debit_Amount,EntryType,ChequeNumber,BankName,Comments) 
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
