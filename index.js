const mysql = require("mysql");
const inquirer = require("inquirer");
const {createDepartment, createRole, createEmployees} = require("./createNew");
const departmentList = require("./dataList/departmentList");
const askMenu = require("./askMenu");
const askForRole = require("./askForRole");
const askForDepartment = require("./askForDepartment");
const askForEmployee = require("./askForEmployee");

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
    const {menu} = await askMenu();
    if (menu === "Add department"){
        addDepartment();
    }
    else if (menu === "Add roles"){
        addRole();
    }
    else if (menu === "Add employees"){
        addEmployee();
    }
    else if (menu === "View department"){
        await viewDepartmentList();
    }
}

async function addDepartment(){
    const answer = await askForDepartment();
    await createDepartment(connection, answer);
    console.log(`${answer.name} is added to the database.`)
};

async function addRole(){
    const answer = await askForRole();
    await createRole(connection, answer);
    console.log(`${answer.title} is added to the database.`)
};

async function addEmployee(){
    const answer = await askForEmployee();
    await createEmployees(connection, answer);
    console.log(`${answer.first_name} ${answer.last_name} is added to the database.`)
};

async function viewDepartmentList(){
    const departmentArray =  await departmentList(connection);
    return inquirer.prompt( 
        {
            type:"list",
            name: "departmentList",
            message: "What department does the role belong to?",
            choices: departmentArray
        }
    )
}





