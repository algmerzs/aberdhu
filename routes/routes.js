const express = require("express");
const fetch = require("node-fetch");
const { Router } = require("express");
const router = Router();
const news = require("../request");

router.get("/", (req, res) => {
  res.send("esta funcionando");
});

router.get("/news", async (req, res) => {

// Función para obtener las noticias

    // let fetchResponse = await fetch(news.coins_api_url);
    // let infoInJson = await fetchResponse.json();

  res.render("news");

  // console.log(infoInJson)

  // for(let i=0;i < infoInJson.results.length; i++){
  //   console.log("titulo ", i, infoInJson.results[i].title);
  //   console.log("descripción ", i, infoInJson.results[i].description);
  //   console.log("fecha ", i, infoInJson.results[i].published_utc);
  // }

});

module.exports = router;

//encontrar api noticias