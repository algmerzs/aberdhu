// archivos necesarios
const express = require("express");
const router = express.Router();
const crypto = require("../lib/crypto");
const connection = require("../database/database");

// petición para registrar nuevo usuario
router.post("/register", (req, res) => {

    // objeto con la información del usuario
    var newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    // Confirmación de contraseña
    let passwordConfirm = req.body.passwordConfirm;

    // 1. Verificar que no haya ningún otro usuario con el mismo username en la BD
    connection.query("SELECT * FROM users WHERE username = ?", [newUser.username], async (err, resu) => {
        if (err)
            console.log(err);

        // 2. Si no hay ninguno se procederá 
        if (resu.length === 0) {

            // 3. Verificar existencia de la contraseña y su confirmación
            if (newUser.username && newUser.password) {

                // 4. Confirmar que coincidan, de otra manera se le advertirá al usuario
                if (newUser.password === passwordConfirm) {

                    // 5. Crear sesión (cookie)
                    req.session.user = newUser;

                    // 6. Alerta
                    res.render("pages/register", {
                        alert: true,
                        alertTitle: "Registro",
                        alertMessage: "Registro exitoso",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        reg: true
                    });

                    // 7. Encriptar contraseña
                    newUser.password = await crypto.encryptPassword(newUser.password);

                    // 8. Insertar registro en BD
                    connection.query("INSERT INTO users SET ?", [newUser], async (err, resu) => {
                        if (err) {
                            console.log(err);
                        }

                    });

                } else {

                    // Mensaje advertencia(contraseñas no coinciden)
                    res.render("pages/register", {
                        alert: true,
                        alertTitle: "Registro",
                        alertMessage: "Registro fallido, contraseñas no coinciden",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        reg: false
                    })
                }
            }
        } else {
            // Mensaje advertencia(ya existe usuario)
            res.render("pages/register", {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Registro fallido, ya existe el correo o usuario",
                alertIcon: "warning",
                showConfirmButton: true,
                timer: false,
                reg: false
            });
        }
    });

});

module.exports = router;