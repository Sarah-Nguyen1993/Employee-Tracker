const mysql = require("mysql");
const inquirer = require("inquirer");
const {createDepartment, createRole, createEmployees} = require("./createNew");
const {departmentList, employeeList, roleList} = require ("./view")
const askMenu = require("./askMenu")

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
    //console.log(title, departmentName,salary);
    await createRole(connection, answer);
    console.log(`${answer.title} is added to the database.`)
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
            name: "department_id",
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
    await createEmployees(connection, answer);
    console.log(`${answer.first_name} ${answer.last_name} is added to the database.`)
};


async function addEmployee(){
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
            type: "list",
            name:"role_id",
            message: "What is the employee's role?",
            choices: await roleList(connection)
        },
        {
            type: "list",
            name:"manager_id",
            message: "Who does the role report to?",
            choices: await employeeList(connection)
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





