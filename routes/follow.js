const express = require("express");
const connection = require("../database/database");
const router = express.Router();
const { isLoggedIn } = require("../lib/auth.js");

// agregar y eliminar criptomoneda a BD

router.get("/addIndi/:symbol/:price", isLoggedIn, (req, res) => {
    const { symbol, price } = req.params;
    let user = req.session.user;

    // búsqueda BD

    connection.query(
        "SELECT * FROM users WHERE username = ?",
        [user.username],
        (err, resu) => {
            if (err) throw err;

            let userId = resu[0].userId;

            if (resu.length > 0) {
                const newFollow = {
                    symbol,
                    current_price: price,
                    userId: userId,
                };

                connection.query(
                    "SELECT * FROM indicators WHERE userId = ? AND symbol = ?",
                    [userId, symbol],
                    (err, resu) => {
                        if (err) throw err;

                        if (resu.length > 0) {
                            connection.query(
                                "DELETE FROM indicators WHERE userId = ? AND symbol = ?",
                                [userId, symbol],
                                (err, resu) => {
                                    if (err) throw err;
                                }
                            );
                        } else {
                            // Insertar criptomoneda a BD
                            connection.query(
                                "INSERT INTO indicators SET ?",
                                [newFollow],
                                (err, resu) => {
                                    if (err) throw err;
                                }
                            );
                        }
                    }
                );
            } else {
                console.error("PLATFORM ERROR");
                res.send(
                    "PLATFORM ERROR, PLEASE ENTER IN A FEW MINUTES \n ERROR EN LA PLATAFORMA, POR FAVOR ENTRE EN UNOS MINUTOS"
                );
            }
        }
    );
});

module.exports = router;
