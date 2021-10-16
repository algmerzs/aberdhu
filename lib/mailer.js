// 
// 2) si el precio es 5% mayor se envia notificación
// 3) guardar en BD

const fetch = require("node-fetch");
const CronJob = require('cron').CronJob;
const nodemailer = require("nodemailer");
const connection = require("../database/database");

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50";

var symbolAndPrice = [];

const getData = async () => {

    var res = await fetch(url)
    var resInJson = await res.json();

    resInJson.map(e => {
        symbolAndPrice.push([e.symbol, e.current_price]);
    });

    getUsers(symbolAndPrice);
    symbolAndPrice = [];
};

const getUsers = async (prices) => {

    connection.query("SELECT * FROM users", (err, resu) => {

        if (err)
            throw err;

        resu.forEach(e => {

            let username = e.username;
            let mail = e.email;

            connection.query("SELECT symbol, current_price FROM indicators WHERE indi_username = ?", [e.id], async (err, resu) => {

                if (err)
                    throw err;

                if (resu.length > 0) {

                    let SymbolAndPrice = await resu.map(e => {
                        return [e["symbol"], e["current_price"]];
                    });

                    let info = getCoincidence(prices, SymbolAndPrice);


                    if (info[4]) {
                        let contentHTML = `
                        <h1> Cambios en moneda que sigue el usuario: ${username} </h1>

                            <h4>Ha habido un aumento en la criptomoneda ${info[0]} que estas siguiendo</h4>
                            <p> Ha aumentado en $${info[3]} y su precio actual es: ${info[1]}</p>

                            <b> Precio anterior: ${info[2]} </b>

                        `;

                        sendNotification(contentHTML, mail, "AUMENTO");
                    } else if (!info[4]) {
                        let contentHTML = `
                        <h1> Cambios en moneda que sigue el usuario: ${username} </h1>

                            <h4>Ha habido un descenso en la criptomoneda ${info[0]} que estas siguiendo</h4>
                            <p> Ha disminuido en $${info[3]} y su precio actual es: ${info[1]}</p>

                            <b> Precio anterior: ${info[2]} </b>

                        `;
                        sendNotification(contentHTML, mail, "DISMINUCIÓN");
                    }

                } else {
                    console.log("USER DOES NOT FOLLOW ANY SYMBOL");
                }

            });
        });
    });
};

const getCoincidence = (api, user) => {

    let info = [];
    for (const [symbol, price] of api) {
        for (const [s, p] of user) {
            if (symbol === s) {
                if (price > p) {
                    let change = price - p;
                    info = [s, price, p, change, true];
                } else if (price < p) {
                    let change = p - price;
                    info = [s, price, p, change, false];
                }
            }
        }
    }
    return info;
}

const sendNotification = async (mailToSend, user, chase) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aberdhumailer@gmail.com',
            pass: 'Dr7k*Xd%*r3iKT@cJb'
        }
    });

    let info = await transporter.sendMail({
        from: '"Página noticias financieras" <aberdhumailer@gmail.com>',
        to: user,
        subject: `${chase} en criptomonedas`,
        html: mailToSend
    });

    console.log("Message sent: %s", info.messageId);

};

setInterval(() => {
    getData();
}, 60000);