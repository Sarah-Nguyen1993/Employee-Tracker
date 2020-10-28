
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

function managerList(connection) {
    return new Promise((resolve, reject) => {
        const managers = connection.query("SELECT CONCAT(first_name, ' ', last_name) from employees where employees.id = employees.manager_id",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    console.log(managers)
                    resolve(data);
                }
            });
    })
};

module.exports = {departmentList,managerList};