function createDepartment (connection, data){
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO department SET ?", data, 
        function(err, data){
            if(err){ reject(err) }
            else { resolve(data) }
        });
    })
};

function createRole (connection, title,departmentName, salary){
    return new Promise((resolve, reject) => {
       
        connection.query("INSERT INTO role SET title =?, salary =?, department_id = (SELECT id FROM department WHERE department.name = ?)", [title, salary, departmentName], 
        function(err, data){
            if(err){ reject(err) }
            else { resolve(data) }
        });
    })
};

function createEmployees (connection, data){
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO employees SET ?", data, 
        function(err, data){
            if(err){ reject(err) }
            else { resolve(data) }
        });
    })
};

module.exports = {
    createDepartment,
    createRole,
    createEmployees
}
