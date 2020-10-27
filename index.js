const mysql = require("mysql");
const inquirer = require("inquirer");
const {createDepartment, createRole, createEmployees} = require("./createNew");
const departmentList = require("./dataList/departmentList");
const askForMenu = require("./askFor/askForMenu");
const askForRole = require("./askFor/askForRole");
const askForDepartment = require("./askFor/askForDepartment");
const askForEmployee = require("./askFor/askForEmployee");

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
        connection.query("SELECT role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY salary DESC",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    console.table(data)
                    resolve(data);
                }
            });
    })
}


