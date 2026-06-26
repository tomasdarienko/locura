import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3001/locura.html', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1400));

// Jump into map section and force-show layer B text with full opacity + white fill
await page.evaluate(() => {
  window.scrollTo(0, 2160);
  window.dispatchEvent(new Event('scroll'));
  if (window.ScrollTrigger) window.ScrollTrigger.update();
  // Force layer B visible with solid color so we can confirm it renders
  const mlB = document.getElementById('ml-b');
  if (mlB) {
    mlB.style.opacity = '1';
    const title = mlB.querySelector('.ml-b-title');
    if (title) { title.style.color = '#F0EDE8'; title.style.webkitTextStroke = 'none'; }
  }
  // Force layer A hidden
  const mlA = document.getElementById('ml-a');
  if (mlA) mlA.style.opacity = '0';
});
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: './screenshots/026-map-forced.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
await browser.close();
console.log('Done');
