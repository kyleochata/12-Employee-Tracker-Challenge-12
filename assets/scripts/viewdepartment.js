// handling for if they choose view dep

const db = require(`./mysqlConnect`);
const { init } = require(`../../index`);


const viewDepartments = () => {
  db.query(`SELECT * FROM departments`, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  })
}

// const viewRoles = () => {
//   db.query(`SELECT * FROM roles`, (e, res) => {
//     e ? console.error(e) : console.table(res);
//     init();
//   })
// }

// const viewEmployees = () => {
//   db.query(`SELECT * FROM employees`, (e, res) => {
//     e ? console.error(e) : console.table(res);
//     init();
//   })
// }

module.exports = { viewDepartments }