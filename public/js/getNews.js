const newsList2 = new Vue({
    el: '#news',
    data: {
        news: [],
        baseURL: "https://api.polygon.io/v2/reference/news?limit=50&order=descending&sort=published_utc&ticker=AAPL&published_utc.gte=2021-04-26&apiKey=dDrG9Sy4A8u30T0WffgfzqJfEl70Vbfo",
        page: 1,
        perPage: 6,
        pages: []
    },
    created() {
        this.getNews();
    },
    methods: {
        async getNews() {
            let res = await fetch(this.baseURL);
            let newsInJson = await res.json();
            let news = await newsInJson.results;
            this.news = news;
        },
        paginate(news) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return news.slice(from, to);
        },
        setNews() {
            let nPages = Math.ceil(this.news.length / this.perPage);
            for (i = 1; i <= nPages; i++) {
                this.pages.push(i);
            }
        }
    },
    computed: {
        displayedNews() {
            return this.paginate(this.news);
        }
    },
    watch: {
        news() {
            this.setNews();
        }
    }
});