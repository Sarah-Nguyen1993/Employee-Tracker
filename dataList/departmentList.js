
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

module.exports = departmentList;