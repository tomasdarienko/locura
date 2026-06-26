import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3001/locura.html', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1400));

// Force map section to specific progress states via JS
async function setMapProgress(p) {
  await page.evaluate((prog) => {
    // Jump past hero, into map zone
    const hero = document.getElementById('loc-hero');
    const heroH = hero ? hero.offsetHeight : 900;
    // Map section end is "+=350%" of viewport = 350 * innerHeight / 100 * 100
    const mapScrollLen = window.innerHeight * 3.5;
    const target = heroH + mapScrollLen * prog;
    window.scrollTo(0, target);
    // Manually update GSAP ScrollTrigger
    if (window.ScrollTrigger) window.ScrollTrigger.update();
  }, p);
  await new Promise(r => setTimeout(r, 300));
}

await setMapProgress(0.05);
await page.screenshot({ path: './screenshots/020-map-p05.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

await setMapProgress(0.40);
await page.screenshot({ path: './screenshots/021-map-p40.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

await setMapProgress(0.80);
await page.screenshot({ path: './screenshots/022-map-p80.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

await browser.close();
console.log('Done');
