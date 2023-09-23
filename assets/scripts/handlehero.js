//imports and global variables
const inquirer = require('inquirer');

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
      `Update an employee's role`, new inquirer.Separator()
    ],
    name: `start`
  }
]

//function to handle the users first choice from hero list


module.exports = { heroList }