// módulo mysql
const mysql = require("mysql");

// conectar con BD
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// verificar conexión BD
connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connection to MYSQL sucessful");
    }
});

module.exports = connection;