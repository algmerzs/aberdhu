// Inicializaciones
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

// Iniciar servidor
const app = express();

// Configuraciones y middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

// Archivos estáticos
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

// Variables de entorno
dotenv.config({
    path: "./env/.env",
});

// Rutas
app.use("/", require("./routes/router"));
app.use("/", require("./routes/register"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/follow"));

// motor de vistas
app.set("view engine", "ejs");

// Iniciar escucha servidor
app.listen(7000, () => {
    console.log("Server running in http://localhost:7000");
});

// Enviar correos
// require("./lib/mailer");
