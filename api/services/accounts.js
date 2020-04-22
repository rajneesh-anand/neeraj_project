const pool = require("../config/database");

module.exports = {
	create: (data, callBack) => {
		pool.query(
			`insert into accounts(Prefix,Date, Account_Name,Account_Type,Remarks, Opening_Balance, Credit_Amount,Debit_Amount) 
                values(?,?,?,?,?,?,?,?)`,
			[
				data.prefix,
				data.date,
				data.account_name,
				data.account_type,
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
