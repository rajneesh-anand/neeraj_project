const NodeTable = require("../services/nodetable");
const pool = require("../config/database");

module.exports = {
  createSupplier: (req, res) => {
    const body = req.body;
    const reg = {
      first_name: body.fname,
      email: body.email,
    };

    pool.query(
      "SELECT COUNT(*) AS cnt FROM suppliers WHERE first_name = ? and email= ?",
      [reg.first_name, reg.email],
      (err, data) => {
        if (err) {
          return res.status(403).json({
            message: err,
          });
        }
        if (data[0].cnt > 0) {
          return res.status(403).json({
            message: "Supplier already exists !",
          });
        } else {
          pool.query(
            `insert into suppliers(Prefix,first_name, last_name,address_line_one, address_line_two,city,state,pincode,mobile,phone,gstin,email,pan) 
                          values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              body.prefix,
              body.first_name,
              body.last_name,
              body.address_line_one,
              body.address_line_two,
              body.city,
              body.state,
              body.pincode,
              body.mobile,
              body.phone,
              body.gstin,
              body.email,
              body.pan,
            ],
            (error, results, fields) => {
              if (error) {
                return res.status(403).json({
                  message: error,
                });
              }
              return res.status(200).json({
                message: "Supplier Record Added",
              });
            }
          );
        }
      }
    );
  },
  getSupplierslist: (req, res) => {
    // Get the query string paramters sent by Datatable
    const requestQuery = req.query;

    let columnsMap = [
      {
        db: "id",
        dt: 0,
      },
      {
        db: "first_name",
        dt: 1,
      },
      {
        db: "city",
        dt: 2,
      },
      {
        db: "state",
        dt: 3,
      },
      {
        db: "gstin",
        dt: 4,
      },
    ];

    // Custome SQL query
    const query =
      "SELECT concat(s.Prefix,s.id) as id,s.first_name,s.last_name,s.address_line_one,s.address_line_two,s.city,s.pincode,s.mobile,s.email,s.phone,s.gstin,s.pan,st.State_Name as state FROM suppliers s, states st where s.state =st.id";
    // NodeTable requires table's primary key to work properly
    const primaryKey = "id";

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
  getSupplierById: (req, res) => {
    const id = req.params.id;
    pool.query(
      `select * from suppliers where id = ?`,
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
  updateSupplier: (req, res) => {
    const body = req.body;

    pool.query(
      `update suppliers set first_name=?, last_name=?, address_line_one=?, email=?, address_line_two=?, mobile=?, phone=?, state=?, gstin=?, city=? where id = ?`,
      [
        body.first_name,
        body.last_name,
        body.address_line_one,
        body.email,
        body.address_line_two,
        body.mobile,
        body.phone,
        body.state,
        body.gstin,
        body.city,
        body.id,
      ],
      (error, results, fields) => {
        if (error) {
          return res.status(403).json({
            message: error,
          });
        }
        return res.status(200).json({
          message: "Supplier Record Updated",
        });
      }
    );
  },
  fetchSuppliers: (req, res) => {
    pool.query(
      `SELECT concat(Prefix,id) as id, first_name,mobile FROM suppliers`,
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
};
