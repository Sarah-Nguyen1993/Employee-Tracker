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
    const answer = await menu();
    console.log(answer)
    if (answer.menu === "Add department"){
        console.log(answer)
        addDepartmentFlow();
    }
}

function menu(){
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
    const answer = await addDepartment();
    //await createDepartment(conection, department);
    console.log(`${answer.department} is added to the database.`)
};
// async function addRoleFlow(){};
// async function addEmployeeFlow(){};

function addDepartment(){
    return inquirer.prompt({
        type: "input",
        name: "department",
        message: "What department would you like to add?"
    })
}

