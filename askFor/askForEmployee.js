const inquirer = require("inquirer");
const roleList = require("../dataList/roleList");
const managerList = require("../dataList/managerList");

async function askForEmployee(connection){
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
            choices: await managerList(connection)
        }
    ])
};

module.exports = askForEmployee;