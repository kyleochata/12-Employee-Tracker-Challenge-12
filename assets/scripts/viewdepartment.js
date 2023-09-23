// handling for if they choose view dep

const db = require(`./mysqlConnect`);
const init = require(`../../index`);

const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  })
}