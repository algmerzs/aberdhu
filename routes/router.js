const express = require("express");
const connection = require("../database/database");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth.js');

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
    var following = [];

    const arrayToString = (arr) => {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                str += `${arrayToString(arr[i])} `;
            } else {
                str += `-${arr[i]}`;
            };
        };
        return str;
    };

    if (user) {
        connection.query("SELECT * FROM users WHERE username = ?", [user.username], (err, resu) => {

            if (err)
                throw err;

            if (resu.length > 0) {

                let userId = resu[0].id;

                connection.query("SELECT * FROM indicators WHERE indi_username = ?", [userId], (err, resu) => {
                    if (err)
                        throw err

                    if (resu.length > 0) {
                        let i = 0;
                        resu.map(r => {
                            following[i] = r.symbol;
                            i++;
                        });

                    }
                    let final = arrayToString(following);
                    res.cookie("follows", final);
                    res.render("pages/home", { user });
                });
            }

        });
    } else {
        res.render("pages/home", { user });
    }

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
    res.clearCookie("follows");

    res.redirect("/");

});

module.exports = router;