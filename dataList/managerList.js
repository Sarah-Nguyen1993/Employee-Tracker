function managerList(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT CONCAT(first_name, ' ', last_name) as name FROM employees where manager_id is null",
            function (err, data) {
                if (err) {reject(err)} 
                else {
                    console.table(data)
                    resolve(data);
                }
            });
    })

};

module.exports = managerList;