const newsList = new Vue({
    el: '#newHOME',
    data: {
        news: []
    },
    async mounted() {

        let res = await fetch(`https://api.polygon.io/v2/reference/news?${"limit=3"}&apiKey=dDrG9Sy4A8u30T0WffgfzqJfEl70Vbfo`)
        let newsInJson = await res.json();
        let news = await newsInJson.results;
        this.news = news;
    }
});

const listIndi = new Vue({

    el: "#indicators",
    data: {
        indi: []
    },
    async mounted() {
        let res = await fetch("https://api.coingecko.com/api/v3/coins/markets?page=1&per_page=4&vs_currency=usd&order=market_cap_desc");
        let indiInJson = await res.json();
        this.indi = indiInJson;
    }

});
