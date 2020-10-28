const inquirer = require("inquirer");
const departmentList = require("../dataList/departmentList");
const roleList = require("../dataList/roleList");

async function askForUpdateEmployeeRole(connection){
    return inquirer.prompt([
        {
            type:"list",
            name:"role_id",
            message:"What role do you want to update?",
            choices: await roleList(connection)
        },
        {
            type:"input",
            name:"newRole",
            message:"What is the new role?"
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

module.exports = askForUpdateEmployeeRole;