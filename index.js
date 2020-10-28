const mysql = require("mysql");
const {createDepartment, createRole, createEmployees} = require("./createNew");
const askForMenu = require("./askFor/askForMenu");
const askForRole = require("./askFor/askForRole");
const askForDepartment = require("./askFor/askForDepartment");
const askForEmployee = require("./askFor/askForEmployee");
const askForUpdateEmployeeRole = require("./askFor/askForUpdateEmployeeRole");
//const managerList = require("./dataList/departmentList")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcampUT2020",
    database: "employee_trackerBD"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

async function start(){
    const {menu} = await askForMenu();
    if (menu === "Add departments"){
       await addDepartment();
    //    await managerList(connection);
       start();
    }
    else if (menu === "Add roles"){
        await addRole();
        start();
    }
    else if (menu === "Add employees"){
        await addEmployee();
        start();
    }
    else if (menu === "View departments"){
        await viewDepartments();
        start();
    }
    else if (menu === "View roles"){
        await viewRoles();
        start();
    }
    else if (menu === "View all employees"){
        await viewAllEmployees();
        start();

    }
    else if (menu === "Update employee role"){
       await updateEmployeeRole();
       start();
    }
}

async function addDepartment(){
    const answer = await askForDepartment();
    await createDepartment(connection, answer);
    console.log(`${answer.name} is added to the database.`)
};

async function addRole(){
    const answer = await askForRole(connection);
    await createRole(connection, answer);
    console.log(`${answer.title} is added to the database.`)
};

async function addEmployee(){
    const answer = await askForEmployee(connection);
    await createEmployees(connection, answer);
    console.log(`${answer.first_name} ${answer.last_name} is added to the database.`)
};

function viewDepartments(){
    return new Promise((resolve, reject) => {
        connection.query("SELECT id, name AS department FROM department",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    console.table(data)
                    resolve(data);
                }
            });
    })
}

function viewRoles(){
    return new Promise((resolve, reject) => {
        connection.query("SELECT role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY salary DESC",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    console.table(data)
                    resolve(data);
                }
            });
    })
}

function viewAllEmployees(){
    var query = "SELECT E1.id, E1.first_name, E1.last_name,"
    query += "role.title, department.name as department, role.salary,";
    query += " CONCAT(E2.first_name,' ', E2.last_name) as manager";
    query += " from employees E1";
    query += " LEFT JOIN role on E1.role_id = role.id";
    query += " LEFT JOIN department on role.department_id = department.id";
    query += " LEFT JOIN employees E2 on E2.id = e1.manager_id";
    query += " ORDER BY salary DESC"
    return new Promise((resolve, reject) => {
        connection.query(query,
            function (err, data) {
                if (err) { reject(err) }
                else {
                    console.table(data)
                    resolve(data);
                }
            });
    })
}

async function updateEmployeeRole(){
    const answer = await askForUpdateEmployeeRole(connection);
    //since name is coded as id in employeeList, the answer gotten from askForUpdateEmployeeRole include employee id and role id
    const {id, role_id} = answer;
    return new Promise((resolve, reject) => {
        connection.query("UPDATE employees SET role_id= ? WHERE id = ?",[role_id, id],
            function (err, data) {
                if (err) { reject(err) }
                else {
                    resolve(data);
                }
            });
    });    
}

