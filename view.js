function departmentList(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT name FROM department",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    resolve(data);
                    const departmentList = [];
                    data.map(element => departmentList.push(element.name));
                }
            });
    })

};


module.exports = { departmentList }
