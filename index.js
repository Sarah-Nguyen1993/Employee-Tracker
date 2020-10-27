const mysql = require("mysql");
const inquirer = require("inquirer");
const {createDepartment, createRole, createEmployees} = require("./createNew");
const askForMenu = require("./askFor/askForMenu");
const askForRole = require("./askFor/askForRole");
const askForDepartment = require("./askFor/askForDepartment");
const askForEmployee = require("./askFor/askForEmployee");
const askForUpdateEmployeeRole = require("./askFor/askForUpdateEmployeeRole");

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
        addDepartment();
    }
    else if (menu === "Add roles"){
        addRole();
    }
    else if (menu === "Add employees"){
        addEmployee();
    }
    else if (menu === "View departments"){
        await viewDepartments();
    }
    else if (menu === "View roles"){
        await viewRoles();
    }
    // else if (menu === "View all employees"){
    //     await viewAllEmployees();
    // }
    else if (menu === "Update employee role"){
        await updateEmployeeRole();
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
        connection.query("SELECT * FROM department",
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

// function viewAllEmployees(){
//     var query = "SELECT employees.id, employees.first_name, employees.last_name,"
//     query += "role.title, department.name as department, role.salary, CONCAT(employee.first_name, ' ', employee.last_name) as manager employees.manager_id ";
//     query += " FROM employees";
//     query += " INNER JOIN role on employees.role_id = role.id";
//     query += " INNER JOIN department on role.department_id = department.id";
//     query += " LEFT JOIN employee AS manager on employee.manager_id = department.id";
//     query += " ORDER BY salary DESC"
//     return new Promise((resolve, reject) => {
//         connection.query(query,
//             function (err, data) {
//                 if (err) { reject(err) }
//                 else {
//                     console.table(data)
//                     resolve(data);
//                 }
//             });
//     })
// }

async function updateEmployeeRole(){
    console.log("fsa")
    const answer = await askForUpdateEmployeeRole(connection);
    console.log(answer)
    // return new Promise((resolve, reject) => {
    //     connection.query("UPDATE employee SET WHERE role_id= ?",[role]
    //         function (err, data) {
    //             if (err) { reject(err) }
    //             else {
    //                 console.table(data)
    //                 resolve(data);
    //             }
    //         });
    // })
}

