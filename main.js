const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-extra');
// const userAgent = require('user-agents');
// const randomUseragent = require('random-useragent');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());


(async () => {
    const browser = await puppeteer.launch({ headless: true });

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
        // page.setDefaultNavigationTimeout(0);
        await page.goto('http://sodoc.embaven.cl/consultaprorroga');

        await page.waitForTimeout(3000);

        const DNI = process.argv[2];

        await page.waitForSelector('input[name=dni]');
        await page.$eval('input[name=dni]', el => el.value = DNI);
        // await page.waitForTimeout(1000);

        // await page.waitForSelector('#consultaProrroga');
        // await page.click('#consultaProrroga');
        // await page.waitForTimeout(1000);

        // await page.waitForSelector('.adultos.cursor');
        // await page.click('.adultos.cursor');
        // await page.waitForTimeout(1000);

        // await page.waitForSelector('.swal2-confirm');
        // await page.click('.swal2-confirm');
        // await page.waitForTimeout(1000);

        // await page.waitForSelector('#swal2-content');
        // await page.$eval('#swal2-content', el => {
        //     console.log({ message: el.TEXT_NODE })
        // });

    } catch (error) {
        console.error(error);
    }


    // await browser.close();
})();