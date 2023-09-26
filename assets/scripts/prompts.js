//imports and global variables
const inquirer = require('inquirer');
const { db } = require(`./mysqlConnect`);

//initial question on load
const heroList = [
  {
    type: 'list',
    message: 'Welcome. Please select an option to get started.',
    choices: [`View all departments`, new inquirer.Separator(),
      `View all roles`, new inquirer.Separator(),
      `View all employees`, new inquirer.Separator(),
      `Add a department`, new inquirer.Separator(),
      `Add a role`, new inquirer.Separator(),
      `Add an employee`, new inquirer.Separator(),
      `Update an employee's role`, new inquirer.Separator(),
      `View department budgets`, new inquirer.Separator(),
      `Close program`, new inquirer.Separator(),
    ],
    name: `start`
  }
]

//add department questions
const departmentPrompt = [
  {
    type: 'text',
    message: `Please enter the name of the department you wish to add.`,
    name: `addDepartment`,
    validate: addDepartment => {
      if (addDepartment) {
        return true;
      } else {
        console.log('Please enter a valid department');
        return false;
      }
    }
  }
]


module.exports = { heroList, departmentPrompt }
