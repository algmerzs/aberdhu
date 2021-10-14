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

    let user = req.session.user;
    res.render("pages/home", { user });
});

router.get("/news", (req, res) => {
    let user = req.session.user;
    res.render("pages/news", { user });
});

router.get("/indicators", async (req, res) => {

    var indicators = [];

    await connection.query("SELECT * FROM users", (err, resu) => {
        if (err) {
            throw err
        }
        indicators = resu;
        // console.log(indicators[0]);
    });

    console.log(indicators);
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
    const newFollow = {
        symbol,
        current_price: price,
        indi_username
    }
    // await connection.query("")
    res.redirect("/indicators");

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

// editar usuario

router.post("/update", isLoggedIn, async (req, res) => {

    let id = req.session.user.id;
    let { username, password, email } = req.body;

    let cookieUser = {
        id,
        username,
        password,
        email
    }

    console.log("cookie:", cookieUser);

    encryPass = await crypto.encryptPassword(password);

    let updatedUser = {
        username,
        password: encryPass,
        email
    }

    console.log("updated:", updatedUser);

    // await connection.query("UPDATE users SET ? WHERE id = ?", [updatedUser, id], (err, resu) => {
    //     if (err) {
    //         throw err;
    //     }
    // });


    // res.redirect("/");

});

// cerrar sesión

router.get("/logout", isLoggedIn, async (req, res) => {

    await delete req.session.user;
    res.redirect("/");

});

module.exports = router;