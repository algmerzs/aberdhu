<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="news"></div>
  </div>
</template>

<script>
const url =
  "https://api.polygon.io/v2/reference/news?apiKey=KjushOl8xFajibrTsdzJkU8SGYlb13OE";
const listNews = document.querySelector("#news");
const getInfo = async () => {
  let res = await fetch(url);
  let newsInJson = await res.json();
  let news = await newsInJson.results;

  console.log(news);

  // listNews.innerHTML += news
  //   .map(
  //     (n) =>
  //       `<div> <h3> ${n.title} </h3> <p> ${n.description} </p> <sub> ${n.published_utc} </sub> </div>`
  //   )
  //   .join("");
};
getInfo();
</script>
