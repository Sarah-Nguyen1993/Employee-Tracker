const inquirer = require("inquirer");
const managerList = require("../dataList/managerList")

async function askToSeeEmployeeByManager(connection){
    const managerOptions = await managerList(connection);
    return await inquirer.prompt(
        {
            type: "list",
            name:"manager_id",
            message: "Choose a manager below who you want to see his/her employees",
            choices: managerOptions
        }
    )
};

module.exports = askToSeeEmployeeByManager;