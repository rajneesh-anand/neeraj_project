const pool = require("../config/database");

module.exports = {
	create: (data, callBack) => {
		pool.query(
			`insert into create_accounts(Date, Account_Name,Remarks, Opening_Balance) 
                values(?,?,?,?)`,
			[data.date, data.account_name, data.remarks, data.opening_balance],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
};
