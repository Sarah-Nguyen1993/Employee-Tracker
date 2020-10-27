const inquirer = require("inquirer");
const mysql = require("mysql");
const departmentList = require("../dataList/departmentList");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcampUT2020",
    database: "employee_trackerBD"
});
async function askForRole(){
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
};

module.exports = askForRole;