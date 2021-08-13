// archivos necesarios
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connection = require("../database/database");

// petición para registrar nuevo usuario
router.post("/register", async (req, res) => {

    // objeto con la información del usuario
    let newUser = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email
    }

    let passwordConfirm = req.body.passwordConfirm;

    // 1. Verificar que no haya ningún otro usuario con el mismo username en la BD
    connection.query("SELECT * FROM test WHERE nombre = ?", [newUser.username], (err, resu) => {
        if (err)
            console.log(err);

        // 2. Si el resultado de la query(BD) es vacío se enviará a consola el mensaje "NUEVO REGISTRO", de otra manera se enviará al usuario la advertencia
        if (resu.length === 0) {

            // 3. Verificar existencia de la contraseña y su confirmación
            if (newUser.username && newUser.password) {

                // 4. Confirmar que coincidan, de otra manera se le advertirá al usuario
                if (newUser.password === passwordConfirm) {

                    req.session.user = newUser;

                    // 5. Encriptar contraseña
                    // let passwordHash = await bcrypt.hash(password, 8);
                    res.render("pages/register", {
                        alert: true,
                        alertTitle: "Registro",
                        alertMessage: "Registro exitoso",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        reg: true
                    });

                    // 6. Insertar registro en BD
                    connection.query("INSERT INTO test SET ?", { nombre: newUser.username }, async (err, resu) => {
                        if (err)
                            console.log(err);
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