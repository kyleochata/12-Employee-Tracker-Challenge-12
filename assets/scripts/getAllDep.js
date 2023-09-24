const { db } = require(`./mysqlConnect`)

//Get departments list from db
const departmentList = async () => {
  let departments;
  let depListFromSql;
  const departmentQuery = `SELECT * FROM departments`;
  departments = await db.promise().query(departmentQuery)
    .then((res) => {
      depListFromSql = res[0].map(res => {
        return {
          name: res.department_name,
          value: res.id
        }
      })
      return depListFromSql
    })
    .catch(err => {
      console.error(err);
    })
  return departments;
}

console.log(departmentList());

module.exports = { departmentList };