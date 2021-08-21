const baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";
let parameters = {
    "vs_currency": "usd",
    "order": "market_cap_desc",
    "per_page": "100",
    "page": "1"
}

const listIndi = new Vue({
    el: '#indicators',
    data: {
        indi: []
    },
    async created() {
        let res = await fetch(baseUrl);
        let indiInJson = await res.json();
        this.indi = indiInJson;
    },
});