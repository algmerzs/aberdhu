const express = require("express");
const connection = require("../database/database");
const router = express.Router();

// verificaciones
router.get("/login", (req, res) => {
    res.render("pages/login");
});

router.get("/register", (req, res) => {
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

router.get("/indicators", (req, res) => {
    let user = req.session.user;
    res.render("pages/indicators", { user });
});

router.get("/profile", (req, res) => {

    let user = req.session.user;
    res.render("pages/userprofile", { user });

});

// eliminar usuario

router.get("/delete/:username", async (req, res) => {
    const { username } = req.params;
    await connection.query("DELETE FROM users WHERE username = ?", [username], (err, resu) => {
        if (err) {
            throw err;
        }
    });
    await delete req.session.user;
    res.redirect("/");
});

router.get("/logout", async (req, res) => {

    await delete req.session.user;
    res.redirect("/");

});

module.exports = router;