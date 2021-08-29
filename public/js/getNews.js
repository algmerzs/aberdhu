const newsList = new Vue({
    el: '#news',
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

const newsList2 = new Vue({
    el: '#news2',
    data: {
        news: []
    },
    async mounted() {
        
        let res = await fetch(`https://api.polygon.io/v2/reference/news?${"limit=10"}&apiKey=dDrG9Sy4A8u30T0WffgfzqJfEl70Vbfo`)

        let newsInJson = await res.json();
        let news = await newsInJson.results;
        this.news = news;
    }
});