const inquirer = require("inquirer");
const departmentList = require("../dataList/departmentList");
const roleList = require("../dataList/roleList");

async function askToDeleteDepartment(connection){
    const departmentOption = await departmentList(connection);
    return inquirer.prompt(
        {
            type: 'list',
            name:"department_id",
            message: "Which department do you want to delete?",
            choices: departmentOption
        }
    )
};

async function askToDeleteRole(connection){
    const roleOption = await roleList(connection);
    return inquirer.prompt(
        {
            type: 'list',
            name:"role_id",
            message: "Which role do you want to delete?",
            choices: roleOption
        }
    )
};

async function askToDeleteEmployee(){
    const employeeOption = await employeeList(connection);
    return inquirer.prompt(
        {
            type: 'list',
            name:"employee_id",
            message: "Which employee do you want to delete?",
            choices: employeeOption
        }
    )
};

module.exports ={
    askToDeleteDepartment,
    askToDeleteRole,
    askToDeleteEmployee
}