import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3001/locura.html', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1400));

// Helper: wheel scroll
async function wheelBy(px) {
  await page.mouse.wheel({ deltaY: px });
  await new Promise(r => setTimeout(r, 80));
}

// Scroll past hero (900px total)
for (let i = 0; i < 18; i++) await wheelBy(50);
await new Promise(r => setTimeout(r, 400));

// Screenshot: beginning of map section (Layer A)
await page.screenshot({ path: './screenshots/017-map-layerA.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Scroll deeper into map zoom (another ~1000px = Layer B zone)
for (let i = 0; i < 20; i++) await wheelBy(50);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: './screenshots/018-map-layerB.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Scroll even deeper (Layer C / venue zone)
for (let i = 0; i < 20; i++) await wheelBy(50);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: './screenshots/019-map-layerC.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

await browser.close();
console.log('Done');
