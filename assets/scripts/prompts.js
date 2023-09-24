//imports and global variables
const inquirer = require('inquirer');
const { db } = require(`./mysqlConnect`)
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

//add department questions
const departmentPrompt = [
  {
    type: 'text',
    message: `Please enter the name of the department you wish to add.`,
    name: `addDepartment`
  }
]

//Get departments list from db
const listDepartments = () => {
  const getDepList = db.query(`SELECT department_name FROM departments`, (e, res) => {
    if (e) {
      console.error(e)
    } else {
      return res
    }
  })
  return getDepList
}

//add role questions
const rolePrompt = [
  {
    type: `text`,
    message: `Please enter the name of the role you wish to add.`,
    name: `addRoleName`
  },
  {
    type: `text`,
    message: `Please enter the salary of the role added.`,
    name: `addRoleSalary`
  },
  {
    type: `list`,
    message: `Please choose which department this role is in.`,
    name: `addRoleDepartment`,
    choices: listDepartments()
  }
]

const t = db.query(`SELECT department_name FROM departments`, (e, res) => {
  if (e) {
    console.error(e)
  } else {
    return res
  }
})



console.log(t);

module.exports = { heroList, departmentPrompt }