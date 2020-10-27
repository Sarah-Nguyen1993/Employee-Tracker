const inquirer = require("inquirer")
function askMenu(){
    return inquirer.prompt({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["Add departments", "Add roles", "Add employees", 
        "View departments", "View roles", "View all employees",
        "Update employee role"]
    })
};

module.exports = askMenu;