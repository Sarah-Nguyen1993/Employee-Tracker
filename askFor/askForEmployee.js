const inquirer = require("inquirer");
const mysql = require("mysql");
const employeeList = require("../dataList/employeeList");
const roleList = require("../dataList/roleList");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcampUT2020",
    database: "employee_trackerBD"
});
async function askForEmployee(){
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
};

module.exports = askForEmployee;