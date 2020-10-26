const mysql = require("mysql");
const inquirer = require("inquirer");
const {createDepartment, createRole, createEmployees} = require("./createNew");
const {departmentList, employeeList} = require ("./view")

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
    else if (menu === "Add roles"){
        addRoleFlow();
    }
    else if (menu === "Add employees"){
        addEmployeeFlow();
    }
    else if (menu === "View department"){
        await viewDepartmentList();
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
    const answer = await addDepartment();
    await createDepartment(connection, answer);
    console.log(`${answer.name} is added to the database.`)
};

function addDepartment(){
    return inquirer.prompt({
        type: "input",
        name: "name",
        message: "What department would you like to add?"
    })
}
async function addRoleFlow(){
    const answer = await addRole();
    const {title, departmentName,salary} = answer;
    console.log(title, departmentName,salary);
    await createRole(connection, title, departmentName,salary);
    console.log(`${title} is added to the database.`)
};

async function addRole(){
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What role would you like to add?"
        },
        {
            type: "list",
            name: "departmentName",
            message: "What department does the role belong to?",
            choices: await departmentList(connection)
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        }

    ])
}
async function addEmployeeFlow(){
    const answer = await addEmployee();
    const {first_name, last_name, title} = answer;
    await createEmployees(connection, first_name, last_name, title);
    console.log(`${first_name} ${last_name} is added to the database.`)
};
async function addEmployee(){
    const employees = await employeeList(connection);
    return inquirer.prompt([
        {
            type: "input",
            name:"first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name:"last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name:"title",
            message: "What is the employee's role?"
        },
        {
            type: "list",
            name:"manager",
            message: "Who does the role report to?",
            choices: employees
        },
    ])
}

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





