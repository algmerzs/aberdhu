const newsList = new Vue({
    el: '.news',
    data: {
        news: []
    },
    async mounted() {
        
        let res = await fetch(`https://api.polygon.io/v2/reference/news?${"limit=4"}&apiKey=dDrG9Sy4A8u30T0WffgfzqJfEl70Vbfo`)

        let newsInJson = await res.json();
        let news = await newsInJson.results;
        this.news = news;
    }
});

//


