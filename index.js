/*
start app ==> command line 'npm start' or 'node js' - DONE
Presented with options: ==> list => options - DONE
  View all departments => shown a formatted table showing dep names and department ids
  View all roles => job title, role id, department role belongs to, salary for that role
  View all employees => formated table w/ employee data: id, first name, last name, job title, departments, salaries, managers
  Add department => prompted to enter the name of dep and dep is added to database
  Add role -> name, salary and department for the role -> added to db
  Add employee  => first name, last name, role, manager and employee is added to the database
  Add employee role => select employee to update, new role and this info is updated in db
*/

//Bring in inquirer
const inquirer = require('inquirer');
const { heroList } = require('./assets/scripts/handlehero');
const db = require(`./assets/scripts/mysqlConnect`);


//viewing db functions
const viewDepartments = () => {
  db.query(`SELECT * FROM departments`, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  });
}
const viewRoles = () => {
  db.query(`SELECT * FROM roles`, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  })
};
const viewEmployees = () => {
  db.query(`SELECT * FROM employees`, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  })
}



const handleHeroChoice = response => {
  const { start } = response;

  switch (start) {
    case `View all departments`:
      viewDepartments();
      break;
    case `View all roles`:
      viewRoles();
      break;
    case `View all employees`:
      viewEmployees();
      break;
    case `Add a department`:
      console.log(`add dep case`)
      break;
    case `Add a role`:
      console.log(`add role case`)
      break;
    case `Add an employee`:
      console.log(`add emp case`)
      break;
    case `Update an employee's role`:
      console.log(`update emp role case`)
      break;
  }

}

const init = () => {
  inquirer
    .prompt(heroList)
    .then(handleHeroChoice)
}

init();
