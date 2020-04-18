const pool = require("../config/database");

module.exports = {
	create: (data, callBack) => {
		pool.query(
			`insert into create_accounts(Date, Account_Name,Remarks, Opening_Balance, Credit_Amount,Debit_Amount) 
                values(?,?,?,?,?,?)`,
			[
				data.date,
				data.account_name,
				data.remarks,
				data.opening_balance,
				data.credit_opening,
				data.debit_opening,
			],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
};
