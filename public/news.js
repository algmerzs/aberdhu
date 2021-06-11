const url = "https://api.polygon.io/v2/reference/news?apiKey=KjushOl8xFajibrTsdzJkU8SGYlb13OE";

const listNews = new Vue({
    el: "#news",
    data: {
        news: []
    },
    async created() {

        let res = await fetch(url);
        let newsInJson = await res.json();
        let newsAPI = await newsInJson.results;
        this.news = newsAPI;

    }
});