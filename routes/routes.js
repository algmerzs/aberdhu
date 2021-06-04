const fetch = require("node-fetch");
const { Router } = require("express");
const router = Router();
const news = require("../request");

router.get("/", (req, res) => {
  res.send("esta funcionando");
});

router.get("/coins", async (req, res) => {
  let fetchResponse = await fetch(news.coins_api_url);
  let infoInJson = await fetchResponse.json();
  res.json(infoInJson);
  // console.log(infoInJson);
});

module.exports = router;
