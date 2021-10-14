const express = require("express");
const connection = require("../database/database");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth.js');
const crypto = require("../lib/crypto");

// verificaciones
router.get("/login", isNotLoggedIn, (req, res) => {
    res.render("pages/login");
});

router.get("/register", isNotLoggedIn, (req, res) => {
    res.render("pages/register");
});


// páginas
router.get("/", (req, res) => {

    var user = req.session.user;
    res.render("pages/home", { user });
});

router.get("/news", (req, res) => {
    let user = req.session.user;
    res.render("pages/news", { user });
});

router.get("/indicators", async (req, res) => {

    let user = req.session.user;
    res.render("pages/indicators", { user });
});

router.get("/profile", isLoggedIn, (req, res) => {

    let user = req.session.user;
    res.render("pages/userprofile", { user });

});


// agregar y eliminar criptomoneda a BD

router.get("/addIndi/:symbol/:price", isLoggedIn, async (req, res) => {
    const { symbol, price } = req.params;
    let user = req.session.user;

    await connection.query("SELECT * FROM users WHERE username = ?", [user.username], (err, resu) => {

        if (err)
            throw err;

        if (resu.length > 0) {

            let userId = resu[0].id;

            const newFollow = {
                symbol,
                current_price: price,
                indi_username: userId,
            }

            connection.query("SELECT * FROM indicators WHERE indi_username = ? AND symbol = ?", [userId, symbol], (err, resu) => {

                if (err)
                    throw err

                if (resu.length > 0) {

                    connection.query("DELETE FROM indicators WHERE indi_username = ? AND symbol = ?", [userId, symbol], (err, resu) => {
                        if (err)
                            throw err

                        console.log(resu, "\n SUCCESS, DELETED COIN");
                    });

                    console.log("ALREADY FOLLOWING");
                } else {

                    connection.query("INSERT INTO indicators SET ?", [newFollow], (err, resu) => {
                        if (err)
                            throw err
                        console.log("SUCCESS, STARTED FOLLOWING!")

                    });

                }

            });


        } else {
            console.log("PLATFORM ERROR");
            res.send("PLATFORM ERROR, PLEASE ENTER IN A FEW MINUTES \n ERROR EN LA PLATAFORMA, POR FAVOR ENTRE EN UNOS MINUTOS");
        }

    });
    // res.redirect("/indicators");

});


// eliminar usuario

router.get("/delete/:username", isLoggedIn, async (req, res) => {
    const { username } = req.params;
    await connection.query("DELETE FROM users WHERE username = ?", [username], (err, resu) => {
        if (err) {
            throw err;
        }
    });
    await delete req.session.user;
    res.redirect("/");
});

// cerrar sesión

router.get("/logout", isLoggedIn, async (req, res) => {

    await delete req.session.user;
    res.redirect("/");

});

module.exports = router;