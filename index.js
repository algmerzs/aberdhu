//inicializaciones
const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const dotenv = require("dotenv");
const connection = require("./database/database");

// iniciar servidor
const app = express();

// configuraciones
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

dotenv.config({
    path: "./env/.env"
});

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(7000, () => {
    console.log("Server running in http://localhost:7000");
});