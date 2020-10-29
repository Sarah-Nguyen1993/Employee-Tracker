const inquirer = require("inquirer")
function askMenu(){
    return inquirer.prompt({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["Add departments", "Add roles", "Add employees", 
        "View departments", "View roles", "View all employees",
        "Update employee role", "Update employee manager", "View employees by manager",
        "Delete department", "Delete role", "Delete employee", "Quit"]
    })
};

module.exports = askMenu;