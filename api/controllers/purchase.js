const pool = require("../config/database");
const NodeTable = require("../services/nodetable");

module.exports = {
  insertPurchase: (req, res) => {
    const body = req.body;
    console.log(body);
    const Invoice_Number = body.Invoice_Number;
    pool.query(
      "SELECT COUNT(*) AS cnt FROM purchases WHERE Invoice_Number = ? ",
      [Invoice_Number],
      (err, data) => {
        if (err) {
          return res.status(403).json({
            error: err,
          });
        }
        if (data[0].cnt > 0) {
          return res.status(403).json({
            message: "Invoice already exists !",
          });
        }
        const Sql = `insert into purchases (Invoice_Number,Invoice_Date,Commission,Particulars,Sgst_Rate,Cgst_Rate,Igst_Rate, Sgst_Amount,Cgst_Amount,Igst_Amount, Total_Gst,Total_Amount)                
                    values(?,?,?,?,?,?,?,?,?,?,?,?);`;

        pool.query(
          Sql,
          [
            body.Invoice_Number,
            body.Invoice_Date,
            body.Commission,
            body.Particulars,
            body.Sgst_Rate,
            body.Cgst_Rate,
            body.Igst_Rate,
            body.Sgst_Amount,
            body.Cgst_Amount,
            body.Igst_Amount,
            body.TotalGst_Amount,
            body.Total_Amount,
          ],
          (error, results, fields) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                success: 0,
                message: "Database connection error !",
              });
            }
            return res.status(200).json({
              message: "Invoice saved successfully !",
              data: results,
            });
          }
        );
      }
    );
  },

  fetchPurchaseList: (req, res) => {
    const requestQuery = req.query;

    let columnsMap = [
      {
        db: "Id",
        dt: 0,
      },
      {
        db: "Invoice_Number",
        dt: 1,
      },
      {
        db: "Invoice_Date",
        dt: 2,
      },
      {
        db: "Commission",
        dt: 3,
      },
      {
        db: "Total_Gst",
        dt: 4,
      },
      {
        db: "Total_Amount",
        dt: 5,
      },
    ];

    // Custome SQL query
    const query =
      "SELECT Id, Invoice_Number, Invoice_Date,Commission,Total_Gst,Total_Amount FROM purchases Order By Invoice_Date";
    // NodeTable requires table's primary key to work properly
    const primaryKey = "Id";

    const nodeTable = new NodeTable(
      requestQuery,
      query,
      primaryKey,
      columnsMap
    );

    nodeTable.output((err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      // Directly send this data as output to Datatable
      res.send(data);
    });
  },

  fetchPurchaseById: (req, res) => {
    const id = req.params.id;
    pool.query(
      `select * from purchases where Id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return res.status(403).json({
            message: error,
          });
        }
        return res.status(200).json({
          data: results[0],
        });
      }
    );
  },
  updatePurchase: (req, res) => {
    const body = req.body;

    pool.query(
      `update purchases set Invoice_Date=?,Commission=?,Particulars=?,Sgst_Rate=?,Cgst_Rate=?,Igst_Rate=?, Sgst_Amount=?,Cgst_Amount=?,Igst_Amount=?, Total_Gst=?,Total_Amount=? where Invoice_Number = ?`,
      [
        body.Invoice_Date,
        body.Commission,
        body.Particulars,
        body.Sgst_Rate,
        body.Cgst_Rate,
        body.Igst_Rate,
        body.Sgst_Amount,
        body.Cgst_Amount,
        body.Igst_Amount,
        body.TotalGst_Amount,
        body.Total_Amount,
        body.Invoice_Number,
      ],
      (error, results, fields) => {
        if (error) {
          return res.status(403).json({
            message: error,
          });
        }
        return res.status(200).json({
          message: "Purchase Record Updated",
        });
      }
    );
  },
};
