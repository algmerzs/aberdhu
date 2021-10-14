// archivos necesarios
const express = require("express");
const connection = require("../database/database");
const crypto = require("../lib/crypto");
const router = express.Router();

router.post("/auth", (req, res) => {

    var userLog = {
        username: req.body.username,
        password: req.body.password,
        email: ""
    }

    connection.query("SELECT * FROM users WHERE username = ?", [userLog.username], async (err, resu) => {
        if (err)
            console.log(err);

        if (resu.length > 0) {
            const validPassword = await crypto.matchPassword(userLog.password, resu[0].password);
            if (validPassword) {

                // 5. Crear sesión (cookie)
                userLog.email = resu[0].email;

                req.session.user = userLog;

                // 6. Alerta
                res.render("pages/login", {
                    alert: true,
                    alertTitle: "Login",
                    alertMessage: "Login exitoso",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    reg: true
                });

            } else {
                res.render("pages/login", {
                    alert: true,
                    alertTitle: "Login",
                    alertMessage: "Contraseñas no coinciden",
                    alertIcon: "warning",
                    showConfirmButton: true,
                    timer: false,
                    reg: false
                });
            }
        } else {
            res.render("pages/register", {
                alert: true,
                alertTitle: "Login",
                alertMessage: "No existe el usuario",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                reg: false
            });
        }
    });

});

module.exports = router;