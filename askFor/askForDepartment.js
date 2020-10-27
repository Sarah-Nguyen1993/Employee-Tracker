const inquirer = require("inquirer");

function askForDepartment(){
    return inquirer.prompt({
        type: "input",
        name: "name",
        message: "What department would you like to add?"
    })
}

module.exports = askForDepartment;