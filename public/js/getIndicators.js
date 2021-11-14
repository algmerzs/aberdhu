// obtener cookie de criptomonedas
let cript = [];
let cript2 = [];
// crear array
if (document.cookie != "") {
    cript = document.cookie.split("-");
    cript2 = cript.shift();
}
const listIndi = new Vue({
    el: "#indicators",
    data: {
        indi: [],
        baseURL:
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40",
    },
    created() {
        this.getIndicators();
    },
    methods: {
        async getIndicators() {
            let res = await fetch(this.baseURL);
            let indiInJson = await res.json();
            this.indi = indiInJson;
            this.changeColors();
        },
        // colocar clases correspondientes a cuales sigue el usuario
        followIndi(indi) {
            indicator = document.getElementById(indi);
            if (
                indicator.classList[0] === "bg-danger" ||
                indicator.classList[2] === "bg-danger"
            ) {
                indicator.classList.remove("bg-danger");
                indicator.classList.add("bg-success");
                indicator.innerText = "Siguiendo";
            } else {
                indicator.classList.remove("bg-success");
                indicator.classList.add("bg-danger");
                indicator.innerText = "Seguir";
            }
        },
        changeColors() {
            if (document.cookie == "" || document.cookie == "follows=") {
                console.log("NOT FOLLOWING");
            } else if (cript.length > 0) {
                var inter = setInterval(() => {
                    let ar = document.getElementById("btc");
                    if (ar === null) {
                        console.log("NULL");
                    } else {
                        cript.forEach((e) => {
                            document
                                .getElementById(e)
                                .classList.remove("bg-danger");
                            document
                                .getElementById(e)
                                .classList.add("bg-success");
                            document.getElementById(e).innerText = "Siguiendo";
                        });
                        console.log("INTERVAL");
                        clearInterval(inter);
                    }
                }, 1000);
            }
        },
    },
});
