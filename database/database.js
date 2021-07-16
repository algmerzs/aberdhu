const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connection to MYSQL sucessful");
    }
});

connection.query("SELECT * FROM test", (err, res, fie) => {
    if (err)
        throw err;

    res.forEach(r => {
        console.log(r);
    });
});

connection.end();

module.exports = connection;