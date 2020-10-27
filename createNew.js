function createDepartment (connection, data){
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO department SET ?", data, 
        function(err, data){
            if(err){ reject(err) }
            else { resolve(data) }
        });
    })
};

function createRole (connection, data){
    return new Promise((resolve, reject) => {  
        connection.query("INSERT INTO role SET ?", data, function(err, data){
            if(err){ reject(err) }
            else { resolve(data) }
        });
    })
};

function createEmployees (connection, data){
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO employees SET ?", data, function(err, data){
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
