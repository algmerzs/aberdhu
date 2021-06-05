const { Router } = require("express");
const router = Router();
const path = require("path");

router.get("/", (req, res) => {
  res.send("inicio")
});

router.get("/news", async (req, res) => {

  res.sendFile(path.join(__dirname, '../public/news.html'))

});

module.exports = router;