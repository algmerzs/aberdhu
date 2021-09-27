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

// editar y eliminar usuario

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

router.post("/update", async (req, res) => {


    console.log(req.body.id);
    console.log(req.body.username);

    // let userUpdate = {
    //     "id": req.body.id,
    //     "username": req.body.username,
    //     "email": req.body.email,
    //     "password": req.body.password
    // }

    // console.log(userUpdate.id);

    // await connection.query("UPDATE users SET ? WHERE id = ?", [{ username: userUpdate.username, email: userUpdate.email, password: userUpdate.password }, userUpdate.id], (err, resu) => {
    //     if (err) {
    //         throw err;
    //     }
    // });

    // res.redirect("/");

});

module.exports = router;