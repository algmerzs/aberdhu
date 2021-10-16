let cript = [];
let cript2 = [];
if (document.cookie != '') {
    cript = document.cookie.split("-");
    cript2 = cript.shift()
}
if (document.cookie == 'follows=') {
    setTimeout(() => {
        document.getElementById("msg").innerText = "POR EL MOMENTO NO SIGUES NINGUNA CRIPTOMONEDA"
    }, 1000);
}

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
        indi: [],
        following: [],
        URL: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc",
    },
    created() {
        this.getFollowingIndi()
    },
    async mounted() {
        let res = await fetch("https://api.coingecko.com/api/v3/coins/markets?page=1&per_page=4&vs_currency=usd&order=market_cap_desc");
        let indiInJson = await res.json();
        this.indi = indiInJson;
    },
    methods: {
        async getFollowingIndi() {
            let res = await fetch(this.URL);
            let indiInJson = await res.json();

            for (let j = 0; j < cript.length; j++) {

                for (let i = 0; i < indiInJson.length; i++) {

                    if (indiInJson[i].symbol == cript[j]) {
                        this.following.push(indiInJson[i]);
                    }
                }

            }
        }
    },

});


