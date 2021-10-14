

// 3) verificar con video:  Puppeteer + Node.js = App That Tracks Prices on Amazon
// idea: guardar precio anterior, si el precio es 5% mayor se envia notificación
// luego actualizar precio en la BD
// 4) deberá hacerse ásincrono, no maneja ninguna vista, enviar por cada usuario 
// guardado en la base de datos 
// después preguntar si sigue alguna criptomoneda si no pasa al siguiente
// y verificarlo cada 5 segundos

// 5) crear cookie de cuales sigue, para tener coherencia

// links:
// https://github.com/tombaranowicz/AmazonPricesMonitoring/blob/master/index.js
// https://github.com/FaztTech/nodejs-mysql-links/blob/version-2018/database/db.sql


const puppeteer = require('puppeteer');
const $ = require('cheerio');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const url = "http://localhost:7000/indicators";

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function checkPrice()