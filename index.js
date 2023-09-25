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
const { heroList, departmentPrompt } = require('./assets/scripts/prompts');
const { db } = require(`./assets/scripts/mysqlConnect`);


//viewing db functions
const viewDepartments = () => {
  db.query(`SELECT * FROM departments`, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  });
};
const viewRoles = () => {
  db.query(`SELECT * FROM roles`, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  })
};
const viewEmployees = () => {
  db.query(`SELECT * FROM employees`, (e, r) => {
    e ? console.error(e) : console.table(r);
    init();
  })
}

const addDepartment = () => {
  inquirer
    .prompt(departmentPrompt)
    .then((ans => {
      db.query(`INSERT INTO departments(department_name)
      VALUES( "${ans.addDepartment}")`, (e, res) => {
        if (e) {
          console.error(e);
        } else {
          console.log(`${ans.addDepartment} department has been added. Check out th master list of departments`)
          db.query(`SELECT * FROM departments`, (err, results) => {
            err ? console.error(err) : console.table(results);
            init();
          })
        }
      }
      )

    }))
};

const addRole = () => {
  db.query(`SELECT * FROM departments`, (e, result) => {
    if (e) {
      throw e
    } else {
      const departmentListArr = result.map(department => department.department_name);

      inquirer
        .prompt([
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
            choices: departmentListArr
          }
        ]).then(ans => {
          db.promise().query(`SELECT id FROM departments WHERE department_name = ?`, ans.addRoleDepartment)
            .then(answer => {
              let handledId = answer[0].map(obj => obj.id);
              return handledId[0]
            })
            .then((handledId) => {
              db.promise().query(`INSERT INTO roles(title, salary, department_id)
          VALUES(?, ?, ?)`, [ans.addRoleName, ans.addRoleSalary, handledId]);
              console.log(`${ans.addRoleName} has been added.`);
              viewRoles();
              init();
            })
        })
    }
  })
};


const addEmployee = () => {
  db.query(`SELECT * FROM roles`, (e, roleRes) => {
    if (e) {
      throw e
    } else {
      const roleTitleArr = roleRes.map(roleName => roleName.title)
      db.query(`SELECT * FROM employees`, (e, empResponse) => {
        if (e) {
          throw e
        } else {
          const managerListArr = empResponse.map(managerName => managerName.first_name)
          inquirer
            .prompt([
              {
                type: `text`,
                message: `Please enter the employee's first name.`,
                name: `addEmployeeFirstName`,
                validate: addEmployeeFirstName => {
                  if (addEmployeeFirstName) {
                    return true
                  } else {
                    console.log(`Please enter in a valid name`);
                    return false
                  }
                }
              },
              {
                type: `text`,
                message: `Please enter employee's last name.`,
                name: `addEmployeeLastName`,
                validate: addEmployeeLastName => {
                  if (addEmployeeLastName) {
                    return true
                  } else {
                    console.log(`Please enter in a valid name`);
                    return false
                  }
                }
              },
              {
                type: `list`,
                message: `Please select what role this employee belongs to.`,
                name: `addEmployeeRole`,
                choices: roleTitleArr
              },
              {
                type: `list`,
                message: `Please select who the manager of this employee is.`,
                name: `addEmployeeManager`,
                choices: managerListArr
              },
            ])
            .then(ans => {
              const { addEmployeeFirstName, addEmployeeLastName, addEmployeeRole, addEmployeeManager } = ans;
              const roleId = roleRes.find(res => res.title === addEmployeeRole).id;
              const managerId = empResponse.find(res => res.first_name === addEmployeeManager).id;

              const addValues = [addEmployeeFirstName, addEmployeeLastName, roleId, managerId];
              console.log(addValues)

              db.query('INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)', addValues, (err, insertRes) => {
                if (err) {
                  console.log(`insert employee error`)
                } else {
                  console.log(`${addEmployeeFirstName} ${addEmployeeLastName} has been added.`)
                  viewEmployees();
                  init();
                }
              })

            })
        }
      })

    }
  })
}

const updateEmployee = () => {

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
      addDepartment();
      break;
    case `Add a role`:
      addRole()
      break;
    case `Add an employee`:
      addEmployee()
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

