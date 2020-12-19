const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const config = require('./config');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS,
    }
});

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://sodoc.embaven.cl/consultaprorroga');

        await page.waitForTimeout(3000);

        await page.waitForSelector('input[name=dni]');
        await page.type('input[name=dni]', config.DNI);
        const dniInput = await page.$('input[name=dni]');
        const dniInputvalue = await page.evaluate(element => element.value, dniInput);

        console.log({ dniInputvalue });

        console.log('waiting for .#consultaProrroga');
        await page.waitForSelector('#consultaProrroga');
        await page.click('#consultaProrroga');

        console.log('waiting for .adultos.cursor');

        await page.waitForTimeout(2000);
        await page.waitForSelector('.adultos.cursor');
        await page.click('.adultos.cursor');

        console.log('waiting for #inputText');
        await page.waitForSelector('#inputText');
        const dniInputConfirmation = await page.$('#inputText');
        const dniInputConfirmationValue = await page.evaluate(element => element.value, dniInputConfirmation);

        console.log({ dniInputConfirmationValue });

        console.log('waiting for .swal2-confirm');
        await page.waitForSelector('.swal2-confirm');
        await page.click('.swal2-confirm');
        await page.waitForTimeout(1000);


        await page.waitForSelector('.swal2-icon-text');
        await page.waitForSelector('#swal2-content');
        const swal2ContentConfirmation = await page.$('#swal2-content');
        const swal2TextContentConfirmation = await page.evaluate(element => element.textContent, swal2ContentConfirmation);

        const mailOptions = {
            from: config.GMAIL_USER,
            to: config.EMAIL_RECIPIENT,
            subject: 'PRORROGA - puppeteer',
            text: swal2TextContentConfirmation
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(error);
    }

    await browser.close();
})();