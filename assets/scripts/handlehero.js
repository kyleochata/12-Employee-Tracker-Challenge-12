//imports and global variables
const inquirer = require('inquirer');
const viewDepartments = require(`./viewdepartment`);
const init = require(`../../index`);
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
const handleHeroChoice = response => {
  const { start } = response;

  switch (start) {
    case `View all departments`:
      viewDepartments();
      break;
    case `View all roles`:
      console.log(`view roles case`)
      break;
    case `View all employees`:
      console.log(`view emp case`)
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

module.exports = { heroList, handleHeroChoice }