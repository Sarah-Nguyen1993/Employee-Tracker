const inquirer = require("inquirer")
function askMenu(){
    return inquirer.prompt({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["Add department", "Add roles", "Add employees", 
        "View department", "View Roles", "View employees",
        "Update employee role"]
    })
};

module.exports = askMenu;