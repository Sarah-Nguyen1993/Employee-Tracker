function employeeList(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT CONCAT(first_name,' ', last_name) as name, id as value FROM employees",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    let employees = data;
                    employees.push({id: null, name: null});
                    resolve(data);
                }
            });
    })

};

module.exports = employeeList;