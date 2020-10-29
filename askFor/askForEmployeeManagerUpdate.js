const inquirer = require("inquirer");
const employeeList = require("../dataList/employeeList");
const managerList = require("../dataList/managerList");

async function askForEmployeeManagerUpdate(connection){
    const employeeOptions =  await employeeList(connection)
    const managerOptions =  await managerList(connection)
    return inquirer.prompt([
        {
            type: "list",
            name:"employee_id",
            message: "Which employee do you want to update?",
            choices: employeeOptions
        },
        {
            type: "list",
            name:"manager_id",
            message: "Who is the new manager of this employee?",
            choices: managerOptions
        },  
    ])
};

module.exports = askForEmployeeManagerUpdate;