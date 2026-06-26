import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3001/locura.html', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1400));

async function scrollTo(px) {
  await page.evaluate((y) => {
    window.scrollTo(0, y);
    window.dispatchEvent(new Event('scroll'));
    if (window.ScrollTrigger) window.ScrollTrigger.update();
  }, px);
  await new Promise(r => setTimeout(r, 400));
}

// Map starts at 900, ends at 4050 = 3150 range
// Progress 0.05 → 900 + 3150*0.05 = 1057
await scrollTo(1057);
await page.screenshot({ path: './screenshots/023-mapA.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Progress 0.40 → 900 + 3150*0.40 = 2160
await scrollTo(2160);
await page.screenshot({ path: './screenshots/024-mapB.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Progress 0.80 → 900 + 3150*0.80 = 3420
await scrollTo(3420);
await page.screenshot({ path: './screenshots/025-mapC.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

await browser.close();
console.log('Done');
