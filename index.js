const mysql = require("mysql");
const inquirer = require("inquirer");
const createNew = require("./createNew");
const { createDepartment } = require("./createNew");

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
        addDepartmentFlow();
    }
}

function askMenu(){
    return inquirer.prompt({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["Add department", "Add roles", "Add employees", 
        "View department", "View Roles", "View employees",
        "Update employee role"]
    })
};
async function addDepartmentFlow(){
    const department = await addDepartment();
    await createDepartment(connection, department);
    console.log(`${department.name} is added to the database.`)
};

function addDepartment(){
    return inquirer.prompt({
        type: "input",
        name: "name",
        message: "What department would you like to add?"
    })
}
// async function addRoleFlow(){
// };
// async function addEmployeeFlow(){};



