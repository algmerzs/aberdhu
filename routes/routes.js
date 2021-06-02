const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.json({ title: "La era de hielo", author: "Marcos Diaz" });
});

router.get("/houses", (req, res) => {
  res.json({ number: 1, date: "september 25th" });
});

module.exports = router;
