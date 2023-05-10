import puppeteer from "puppeteer";
import nodeCron from "node-cron";
import config from "./src/utils/config.js";
import * as teamCtrl from "./src/controllers/team.controller.js";

const pageOptions = {
    waitUntil: 'networkidle2',
    timeout: 0
};

let browserOptions = {
    headless: false, 
    defaultViewport: null,
    args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
    ]
};

export const startScrapping = async () => {
    const browser = await puppeteer.launch(browserOptions);
    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 1080,
        });
        await page.goto(config.url_to_parse, pageOptions);
        const tbodys = await page.$$('tbody');
        const firstTbody = tbodys[0];
        const tbodyChildren = await firstTbody.$$('tr');
        const data = [];


        for (const tr of tbodyChildren) {
            const tds = await tr.$$('td');
            const firstTdContent = await tds[0].getProperty('textContent');
            const position = await firstTdContent.jsonValue();
            const imgElement = await tds[1].$('img');
            const srcProperty = await imgElement.getProperty('src');
            const imgUrl = await srcProperty.jsonValue();
            const name = await tds[1].$eval('a span.d-md-inline', el => el.textContent.trim());
            const playedMatchesTdId = await tds[2].getProperty('textContent');
            const playedMatches = await playedMatchesTdId.jsonValue();
            const winsTdId = await tds[3].getProperty('textContent');
            const wins = await winsTdId.jsonValue();
            const drawsTdId = await tds[4].getProperty('textContent');
            const draws = await drawsTdId.jsonValue();
            const losesTdId = await tds[5].getProperty('textContent');
            const loses = await losesTdId.jsonValue();
            const goalsForTdId = await tds[6].getProperty('textContent');
            const goalsFor = await goalsForTdId.jsonValue();
            const goalsAgainstTdId = await tds[7].getProperty('textContent');
            const goalsAgainst = await goalsAgainstTdId.jsonValue();
            const goalDifferenceTdId = await tds[8].getProperty('textContent');
            const goalDifference = (await goalDifferenceTdId.jsonValue()).trim()
            const pointsTdId = await tds[9].getProperty('textContent');
            const points = await pointsTdId.jsonValue();
            const teamData = {
                position,
                imgUrl,
                name,
                playedMatches,
                wins,
                draws,
                loses,
                goalsFor,
                goalsAgainst,
                goalDifference,
                points
            };
            data.push(teamData);
        };
        await teamCtrl.FSCreateJSONFile(data);
        const teams = await teamCtrl.FSGetJSONFile();
        await teamCtrl.MDBAddDataAsRequired(teams);
    } catch (error) {
        console.log(error);
    } finally {
        await browser.close();
    };
};

export const myCron = nodeCron.schedule(config.cron_time, startScrapping);