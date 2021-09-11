const baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1";
// let parameters = {
//     "vs_currency": "usd",
//     "order": "market_cap_desc",
//     "per_page": "20",
//     "page": "1"
// }

const listIndi = new Vue({
    el: '#indicators',
    data: {
        indi: [],
        baseURL: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc",
        page: 1,
        perPage: 15,
        pages: []
    },
    created() {
        this.getIndicators();
    },
    methods: {
        async getIndicators() {
            let res = await fetch(this.baseURL);
            let indiInJson = await res.json();
            this.indi = indiInJson;
        },
        paginate(indi) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return indi.slice(from, to);
        },
        setIndicators() {
            let nPages = Math.ceil(this.indi.length / this.perPage);
            for (let i = 1; i <= nPages; i++) {
                this.pages.push(i);
            }
        }
    },
    computed: {
        displayedIndicators() {
            return this.paginate(this.indi);
        }
    },
    watch: {
        indi() {
            this.setIndicators();
        }
    }
});