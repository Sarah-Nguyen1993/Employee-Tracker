function departmentList(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT name, id as value FROM department",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    resolve(data);
                }
            });
    })
};

function roleList(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT title as name, id as value FROM role",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    resolve(data);
                }
            });
    })

};

function employeeList(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT CONCAT(first_name,' ', last_name) as name, id as value FROM employees",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    resolve(data);
                }
            });
    })

};


module.exports = { 
    departmentList,
    employeeList,
    roleList
}
