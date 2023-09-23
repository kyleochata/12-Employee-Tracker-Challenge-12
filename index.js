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
const { heroList, handleHeroChoice } = require('./assets/scripts/handlehero');
const mysql = require('mysql2');
const password = require('./assets/scripts/pass');

//connection to mysql server
const db = mysql.createConnection(
  {
    host: `localhost`,
    user: `root`,
    password,
    database: `employee_tracker_db`
  },
  console.log(`Connected to the employee tracker database`)
);



const init = (question, newFile) => {
  inquirer
    .prompt(question)
    .then(newFile)
}

init(heroList, handleHeroChoice);