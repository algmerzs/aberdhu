// inicializaciones
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

// iniciar servidor
const app = express();

// configuraciones y middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

// archivos estáticos
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"))

// variables de entorno
dotenv.config({
    path: "./env/.env"
})

// rutas
app.use("/", require("./routes/router"));
// app.use("/", require("./routes/register"));

// motor de vistas
app.set("view engine", "ejs");

// iniciar escucha servidor
app.listen(7000, () => {
    console.log("Server running in http://localhost:7000");
});