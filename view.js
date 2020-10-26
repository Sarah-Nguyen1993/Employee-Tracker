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

function employeeList(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT first_name, last_name FROM employees",
            function (err, data) {
                if (err) { reject(err) }
                else {
                    resolve(data);
                    const employees = []
                    data.map(person => employees.push(person.first_name + " " + person.last_name));
                    //return (employees)
                    console.log(employees)
                }
            });
    })

};


module.exports = { 
    departmentList,
    employeeList
}
