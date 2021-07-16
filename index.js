//inicializaciones
const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const dotenv = require("dotenv");

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

app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"))

dotenv.config({
    path: "./env/.env"
})

app.set("view engine", "ejs");

const connection = require("./database/database");

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(7000, () => {
    console.log("Server running in http://localhost:7000");
});