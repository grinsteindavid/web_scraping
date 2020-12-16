const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-extra');
// const userAgent = require('user-agents');
// const randomUseragent = require('random-useragent');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

const DNI = process.argv[2];


(async () => {
    const browser = await puppeteer.launch({ headless: false });

    //Randomize User agent or Set a valid one
    // const userAgent = randomUseragent.getRandom();
    // const UA = userAgent || USER_AGENT;
    const page = await browser.newPage();

    try {
        //Randomize viewport size
        // await page.setViewport({
        //     width: 600,
        //     height: 400,
        //     deviceScaleFactor: 1,
        //     hasTouch: false,
        //     isLandscape: false,
        //     isMobile: false,
        // });

        // await page.setUserAgent(UA);
        // await page.setJavaScriptEnabled(true);
        // page.setDefaultNavigationTimeout();
        await page.goto('http://sodoc.embaven.cl/consultaprorroga');

        await page.waitForTimeout(3000);

        await page.waitForSelector('input[name=dni]');
        // await page.$eval('input[name=dni]', el => el.value = '123');
        await page.type('input[name=dni]', DNI);
        const dniInput = await page.$('input[name=dni]');
        const dniInputvalue = await page.evaluate(element => element.value, dniInput);

        console.log({ dniInputvalue });

        console.log('waiting for .#consultaProrroga');
        await page.waitForSelector('#consultaProrroga');
        await page.click('#consultaProrroga');


        // console.log('waiting for response /existe');
        // await page.waitForResponse(response => {
        //     response.url() === 'http://sodoc.embaven.cl/consultaprorroga/existe' && response.status() === 200;
        // });

        // await page.waitForSelector('#swal2-content');
        // const swal2Content = await page.$('#swal2-content');
        // const swal2TextContent = await page.evaluate(element => element.textContent, swal2Content);

        // console.log({ swal2TextContent });

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

        console.log({ swal2TextContentConfirmation });

    } catch (error) {
        console.error(error);
    }


    await browser.close();
})();