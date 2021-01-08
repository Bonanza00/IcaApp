const puppeteer = require('puppeteer');

let myNumber = 0;

const run = async (max) => {
  console.log('RUN')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://qchannelent.q-channel.com/maxi/vastrahamnendeli/qrcode.html');

  await page.waitForTimeout(3000)
  await page.click('#NextTicketKassa01');
  await page.waitForTimeout(1000)

  myNumber = await page.$eval("#MyQnumber", e => e.textContent)

  await browser.close();

  if (myNumber < max) {
    await run(max)
  }
};

run(100)