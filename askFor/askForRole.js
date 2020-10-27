const inquirer = require("inquirer");
const departmentList = require("../dataList/departmentList");

async function askForRole(connection){
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