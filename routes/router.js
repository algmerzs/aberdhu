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

module.exports = router;