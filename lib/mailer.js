// 1) enviar mail

// HAY ERROR CON EL CURRENT_PRICE EN BD

// 2) guardar precio anterior, si el precio es 5% mayor se envia notificación
// luego actualizar precio en la BD

// links:
// https://github.com/tombaranowicz/AmazonPricesMonitoring/blob/master/index.js

const fetch = require("node-fetch");
const CronJob = require('cron').CronJob;
const nodemailer = require("nodemailer");
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
            let mail = e.email;
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

                    sendNotification(contentHTML, mail);

                } else {
                    console.log("USER DO NOT FOLLOW ANY SYMBOL");
                }


            });
        });
    });

}

const sendNotification = async (mailToSend, user) => {

    // console.log("texto: \n", mailToSend, "\n", "correo usuario: ", user);

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
        subject: 'Criptomonedas que sigues',
        text: 'nothing to see here',
        html: mailToSend
    });

    console.log("Message sent: %s", info.messageId);
}

const trackPrice = async () => {
    let job = new CronJob('*/60 * * * * *', () => {
        getData()
    }, null, true, null, null, true);
    job.start
}

trackPrice();
