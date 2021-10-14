const listIndi = new Vue({
    el: '#indicators',
    data: {
        indi: [],
        baseURL: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25",
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
        followIndi(indi) {
            indicator = document.getElementById(indi);

            if (indicator.classList[0] === "bg-danger" || indicator.classList[2] === "bg-danger") {
                indicator.classList.remove("bg-danger");
                indicator.classList.add("bg-success");
                indicator.innerText = "Siguiendo";
            } else {
                indicator.classList.remove("bg-success");
                indicator.classList.add("bg-danger");
                indicator.innerText = "Seguir";
            }
        }
    }
});
let followingCRIPTO = document.cookie;
if (followingCRIPTO != '') {
    let cript = followingCRIPTO.split("-");
    cript.shift();
}

console.log(cript);