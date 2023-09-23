const mysql = require('mysql2');
const password = require(`./pass`);

const db = mysql.createConnection(
  {
    host: `localhost`,
    user: `root`,
    password,
    database: `employee_tracker_db`
  },
  console.log(`Connected to the employee tracker database`)
);

module.exports = db;