
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

module.exports = roleList;