
//import required files, modules
const inquirer = require('inquirer');
const { heroList, departmentPrompt } = require('./assets/scripts/prompts');
const { db } = require(`./assets/scripts/mysqlConnect`);


//viewing db table functions
const viewDepartments = () => {

  db.query(`SELECT * FROM departments`, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  });
};
const viewRoles = () => {
  const roleQuery = `SELECT 
  roles.id, 
  title, 
  salary, 
  department_name 
  FROM 
    roles 
  JOIN 
  departments ON departments.id = roles.department_id`;
  db.query(roleQuery, (e, res) => {
    e ? console.error(e) : console.table(res);
    init();
  })
};
const viewEmployees = () => {
  const viewEmployeeQuery = `SELECT
      employees.id,
      employees.first_name,
      employees.last_name,
      roles.title AS job_title,
      roles.salary,
      department_name,
      CONCAT(manager.first_name, " ", manager.last_name) AS manager_name
    FROM
      employees
    JOIN
      roles ON roles.id = employees.roles_id
    JOIN
      departments ON departments.id = roles.department_id
    LEFT JOIN
      employees AS manager ON employees.manager_id = manager.id`;
  db.query(viewEmployeeQuery, (e, r) => {
    e ? console.error(e) : console.table(r);
    init();
  })
};
//view department budget
//join departments table with roles by department.id and roles.department id
//joins employees to roles table to see how many employees are in the roles 

const viewDepartmentBudget = () => {
  const viewDepBudgetQuery = `SELECT 
  departments.department_name AS Department,
  SUM(roles.salary) AS Total_Budget
  FROM departments
  LEFT JOIN roles ON departments.id = roles.department_id
  LEFT JOIN employees ON roles.id = employees.roles_id
  GROUP BY department_name;
  `;
  db.query(viewDepBudgetQuery, (e, res) => {
    e ? console.error(e) : console.table(res)
    init();
  })
}

//end view db table functions

//add items to db table functions
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
          viewDepartments();

        }
      }
      );
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
              console.log(`-----------------------------------------------`);
              viewRoles();

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
                  console.log(`-----------------------------------------------`);
                  viewEmployees();

                }
              })

            })
        }
      })

    }
  })
}
// end add items to db table functions

//update employee function
const updateEmployee = () => {
  const updateEmployeeQuery = `SELECT 
  CONCAT(employees.first_name, " ", employees.last_name) AS employee_name
  FROM employees`
  db.query(updateEmployeeQuery, (e, updateERes) => {
    if (e) {
      console.error(e);
    } else {
      const updateEmployeeArr = updateERes.map(employee => employee.employee_name);
      const updateEmployeeRoleQuery = `SELECT * FROM roles`;
      db.query(updateEmployeeRoleQuery, (e, uERoleRes) => {
        if (e) {
          console.error(e);
        } else {
          const updateEmployeeRoleArr = uERoleRes.map(roles => roles.title);

          inquirer
            .prompt([
              {
                type: `list`,
                message: `Which employee's role would you like to update?`,
                name: `updateEmployeeName`,
                choices: updateEmployeeArr
              },
              {
                type: `list`,
                message: `What is the new role this employee will be performing`,
                name: `updateEmployeeRole`,
                choices: updateEmployeeRoleArr,
              }
            ])
            .then(ans => {
              const { updateEmployeeName, updateEmployeeRole } = ans;

              const updateQuery = `UPDATE employees
              SET roles_id = (SELECT id FROM roles WHERE title = ?)
              WHERE CONCAT(first_name, " ", last_name) = ?`;

              db.query(updateQuery, [updateEmployeeRole, updateEmployeeName], (e, updateResult) => {
                e ? console.error(e) : console.log(`${updateEmployeeName} role of ${updateEmployeeRole} has been updated`);
                console.log(`-----------------------------------------------`);
                viewEmployees();

              })
            })
        }
      })
    }
  })
}
//end update employee function



//handle initial prompt based on users answer
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
      updateEmployee()
      break;
    case `View department budgets`:
      viewDepartmentBudget()
      break;
    case `Close program`:
      console.log(`Thank you! Good-bye!`);
      process.exit(0);
      break;
  }

}

//function that will prompt choices of what to do, then pass the answer to the switch function
const init = () => {
  inquirer
    .prompt(heroList)
    .then(handleHeroChoice)
}

//initialize the function on node index.js || npm start
init();


