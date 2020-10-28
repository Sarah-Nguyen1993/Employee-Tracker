const inquirer = require("inquirer");
const employeeList = require("../dataList/employeeList");
const roleList = require("../dataList/roleList");

async function askForUpdateEmployeeRole(connection){
    return inquirer.prompt([
        {
            type:"list",
            name:"name",
            message:"Which employee do you want to update role?",
            choices: await employeeList(connection)
        },
        {
            type:"list",
            name:"role_id",
            message:"What is the new role of this employee?",
            choices: await roleList(connection)
        }   
    ])
};

module.exports = askForUpdateEmployeeRole;