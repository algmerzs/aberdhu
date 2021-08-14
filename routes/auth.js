// archivos necesarios
const express = require("express");
const connection = require("../database/database");
const crypto = require("../lib/crypto");
const router = express.Router();

router.post("/auth", async (req, res) => {

    let userLog = {
        "username": req.body.username,
        "password": req.body.password
    }

    connection.query("SELECT * FROM users WHERE username = ?", [userLog.username], async (err, resu) => {
        if (err)
            console.log(err);

        if (resu.length > 0) {
            const validPassword = await crypto.matchPassword(userLog.password, resu[0].password);
            if (validPassword) {
                console.log("Contraseñas coinciden!")
            } else {
                console.log("contraseñas *NO* coinciden")
            }
        }
    });

});

module.exports = router;