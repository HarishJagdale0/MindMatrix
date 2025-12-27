const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "root",
  database: "taskdb"
});
