const express = require("express");
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

module.exports = router;