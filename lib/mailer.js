// 1) enviar mail

// HAY ERROR CON EL CURRENT_PRICE EN BD

// 1) verificar con video:  Puppeteer + Node.js = App That Tracks Prices on Amazon
// idea: guardar precio anterior, si el precio es 5% mayor se envia notificación
// luego actualizar precio en la BD
// 2) deberá hacerse ásincrono, no maneja ninguna vista, enviar por cada usuario 
// guardado en la base de datos 
// después preguntar si sigue alguna criptomoneda si no pasa al siguiente
// y verificarlo cada 5 segundos

// links:
// https://github.com/tombaranowicz/AmazonPricesMonitoring/blob/master/index.js

const fetch = require("node-fetch");
const CronJob = require('cron').CronJob;
const connection = require("../database/database");

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10";

var symbolAndPrice = [];

const getData = async () => {
    var res = await fetch(url)
    var resInJson = await res.json();
    resInJson.map(e => {
        symbolAndPrice.push([e.symbol, e.current_price])
    });
    // console.log(symbolAndPrice);
    getUsers(symbolAndPrice);
    symbolAndPrice = [];
}

const getUsers = async (prices) => {

    connection.query("SELECT * FROM users", (err, resu) => {
        if (err)
            throw err;

        resu.forEach(e => {
            let username = e.username;
            connection.query("SELECT symbol FROM indicators WHERE indi_username = ?", [e.id], async (err, resu) => {
                if (err)
                    throw err;

                if (resu.length > 0) {

                    let items = await resu.map(e => {
                        return e["symbol"]
                    });

                    let following = items.join(" ");

                    let contentHTML = `
                    <h1> MONEDAS QUE SIGUE EL USUARIO: ${username} </h1>
    
                        <p> ${following} </p>

                    `;

                    console.log(contentHTML);
                } else {
                    console.log("USER DO NOT FOLLOW ANY SYMBOL");
                }


            });
        });
    });

}

const trackPrice = async () => {
    let job = new CronJob('*/60 * * * * *', () => {
        getData()
    }, null, true, null, null, true);
    job.start
}

trackPrice();
