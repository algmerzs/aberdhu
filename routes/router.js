const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/home");
});

router.get("/news", (req, res) => {
    res.render("pages/news");
});

router.get("/indicators", (req, res) => {
    res.render("pages/indicators");
});

router.get("/login", (req, res) => {
    res.render("pages/login");
});

router.get("/register", (req, res) => {
    res.render("pages/register");
});

router.get("/profile", (req, res) => {

    let user = req.session.user;
    res.render("pages/profile", { user });

});

module.exports = router;