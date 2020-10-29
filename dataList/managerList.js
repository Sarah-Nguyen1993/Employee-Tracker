function managerList(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT CONCAT(first_name, ' ', last_name) as name, id as value FROM employees where manager_id is null",
            function (err, data) {
                if (err) {reject(err)} 
                else {
                    let managers = data;
                    managers.push({name: "None", value: null});
                    resolve(data);
                }
            });
    })

};

module.exports = managerList;