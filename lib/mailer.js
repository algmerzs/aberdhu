const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const connection = require("../database/database");

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50";

var symbolAndPrice = [];

const getData = async () => {

    var res = await fetch(url);
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

            let id = e.id;
            let username = e.username;
            let mail = e.email;

            connection.query("SELECT symbol, current_price FROM indicators WHERE indi_username = ?", [id], async (err, resu) => {

                if (err)
                    throw err;

                if (resu.length > 0) {

                    let SymbolAndPrice = await resu.map(e => {
                        return [e["symbol"], e["current_price"]];
                    });

                    let info = getCoincidence(prices, SymbolAndPrice);

                    if (info.length === 3) {
                        let contentHTML = `

                    <html>

                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <style type="text/css">
                            /* CLIENT-SPECIFIC STYLES */
                            body,
                            table,
                            td,
                            a {
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                            }

                            table,
                            td {
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                            }

                            img {
                                -ms-interpolation-mode: bicubic;
                            }

                            /* RESET STYLES */
                            img {
                                border: 0;
                                height: auto;
                                line-height: 100%;
                                outline: none;
                                text-decoration: none;
                            }

                            table {
                                border-collapse: collapse !important;
                            }

                            body {
                                height: 100% !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                width: 100% !important;
                            }

                            /* iOS BLUE LINKS */
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: none !important;
                                font-size: inherit !important;
                                font-family: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                            }

                            /* MEDIA QUERIES */
                            @media screen and (max-width: 480px) {
                                .mobile-hide {
                                    display: none !important;
                                }

                                .mobile-center {
                                    text-align: center !important;
                                }
                            }

                            /* ANDROID CENTER FIX */
                            div[style*="margin: 16px 0;"] {
                                margin: 0 !important;
                            }
                        </style>
                    </head>

                    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">

                        <!-- HIDDEN PREHEADER TEXT -->
                        <div
                            style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dolor aliquid omnis consequatur est deserunt,
                            odio neque blanditiis aspernatur, mollitia ipsa distinctio, culpa fuga obcaecati!
                        </div>

                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                        <tr>
                                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#D291BC">
                                                <div
                                                    style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                        style="max-width:300px;">
                                                        <tr>
                                                            <td align="left" valign="top"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                                class="mobile-center" mc:edit="Company Name">
                                                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                                    Aberdhu</h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                                    class="mobile-hide">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                        style="max-width:300px;">
                                                        <tr>
                                                            <td align="right" valign="top"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                                    <tr>
                                                                        <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;"
                                                                            mc:edit="Shop Text">
                                                                            <p
                                                                                style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;">
                                                                            </p>
                                                                        </td>
                                                                        <td
                                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">

                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                                bgcolor="#ffffff">
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:600px;">
                                                    <tr>
                                                        <td align="center"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                                            <br>
                                                            <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"
                                                                edit="Headline">Cambios en criptomoneda que sigue el usuario ${username}
                                                            </h2>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;"
                                                            mc:edit="Paragraph">
                                                            <p
                                                                style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                                                Recuerda que te enviaremos notificaciones cada que la criptomoneda(s) que
                                                                sigues aumenten o disminuyan su precio</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" style="padding-top: 20px;">
                                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                <tr>
                                                                    <td width="75%" align="left" bgcolor="#eeeeee"
                                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"
                                                                        edit="Table Head 1">Criptomoneda</td>
                                                                    <td width="25%" text-transform="uppercase" align="left"
                                                                        bgcolor="#eeeeee"
                                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"
                                                                        edit="Table Head 2">${info[0]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="75%" align="left"
                                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"
                                                                        edit="Item 1">Precio actual</td>
                                                                    <td width="25%" align="left"
                                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"
                                                                        mc:edit="Item Value 1">
                                                                        ${info[1]}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="75%" align="left"
                                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"
                                                                        edit="Item 3">Precio anterior</td>
                                                                    <td width="25%" align="left"
                                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"
                                                                        mc:edit="Item Value 3">
                                                                        ${info[2]}
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" style="padding-top: 20px;">

                                                        </td>
                                                    </tr>
                                                </table>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style=" padding: 35px; background-color: #090c1c;" bgcolor="#1b9ba3">
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:600px;">
                                                    <tr>
                                                        <td align="center"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"
                                                            mc:edit="Section">
                                                            <h2
                                                                style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                                                ¡Sigue más criptomonedas!
                                                            </h2>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" style="padding: 25px 0 15px 0;">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                                                        <a href="https://shorturl.at/gqEY0" target="_blank"
                                                                            style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #D291BC; padding: 15px 30px; border: 1px solid #f667c7; display: block;"
                                                                            mc:edit="Call to Action">Ir allá</a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:600px;">
                                                    <tr>
                                                        <td align="center">
                                                            <img src="https://i.ibb.co/Fwytf2Q/logo.png" width="80" height="100"
                                                                style="display: block; border: 0px;" edit="Logo Footer" />
                                                        </td>

                                                        <td align="center"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;"
                                                            mc:edit="Address">
                                                            <p
                                                                style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                                                Teléfono 5760000, extensión 42403.<br>
                                                                Colombia, Medellín.
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;"
                                                            mc:edit="Unsubscribe">
                                                            <p
                                                                style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                                Si no creaste una cuenta usando esta dirección de correo, por favor ignora
                                                                este correo.</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </body>
                    </html>`;
                        sendNotification(contentHTML, mail);
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
    for (const [symbol, price] of user) {

        for (const [s, p] of api) {

            if (symbol === s) {

                if (price !== p) {

                    if ((price + 2) <= p || (price - 2) >= p) {
                        info = [s, p, price];
                        updateDB(p, s);
                        console.log(s, "user: ", price, "api: ", p, "CHANGE IN PRICE CONSIDERABLE");
                    }

                } else if (price === p) {
                    console.log(s, "user: ", price, "api: ", p, "PRICE REMAINS THE SAME");
                }
            }
        }
    }
    return info;
}

const updateDB = (price, symbol) => {
    connection.query("UPDATE indicators SET current_price = ? WHERE symbol = ?", [price, symbol], (err, resu) => {
        if (err)
            throw err;
    });
}

const sendNotification = async (mailToSend, user) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.M_EMAIL,
            pass: process.env.M_PASS
        }
    });

    let info = await transporter.sendMail({
        from: '"Página noticias financieras" <aberdhumailer@gmail.com>',
        to: user,
        subject: "CAMBIOS en criptomonedas",
        html: mailToSend
    });

    console.log("Message sent: %s", info.messageId);

};

console.log("MAILER INITIALIZED")

setInterval(() => {
    getData();
}, 300000);