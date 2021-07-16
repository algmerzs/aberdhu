const express = require("express");
const mysql = require("mysql");

const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    database: "aberdhu",
    user: "root",
    password: ""
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
})

connection.end();

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(7000);