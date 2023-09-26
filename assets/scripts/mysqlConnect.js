const mysql = require('mysql2');
const password = require(`./pass`);

//connection to mysql server
// for the password, please change to password: `{your password}`
//if viewing on a MAC, host property value may need to change to '127.0.0.1'
const db = mysql.createConnection(
  {
    host: `localhost`,
    user: `root`,
    password,
    database: `employee_tracker_db`
  },
  console.log(`Connected to the employee tracker database`)
);

module.exports = { db };