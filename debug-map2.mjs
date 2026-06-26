import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3001/locura.html', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1400));

const info = await page.evaluate(() => {
  window.scrollTo(0, 2160);
  window.dispatchEvent(new Event('scroll'));
  if (window.ScrollTrigger) window.ScrollTrigger.update();
  
  const hero = document.getElementById('loc-hero');
  const map = document.getElementById('loc-map');
  const mlA = document.getElementById('ml-a');
  
  // Check computed styles
  const heroCS = window.getComputedStyle(hero);
  const mapCS = window.getComputedStyle(map);
  
  return {
    scrollY: window.scrollY,
    heroPosition: heroCS.position,
    heroZIndex: heroCS.zIndex,
    heroDisplay: heroCS.display,
    heroVisibility: heroCS.visibility,
    heroTop: heroCS.top,
    mapPosition: mapCS.position,
    mapZIndex: mapCS.zIndex,
    mapTop: mapCS.top,
    mapDisplay: mapCS.display,
    mapTransform: mapCS.transform,
    mlA_opacity: window.getComputedStyle(mlA).opacity,
    mlA_textContent: mlA.querySelector('.ml-a-place') ? mlA.querySelector('.ml-a-place').textContent.trim() : 'NOT FOUND',
    // Check if there's a gsap pin spacer
    pinSpacer: document.querySelector('.gsap-marker-start') ? 'markers present' : 'no markers',
    pinSpacers: Array.from(document.querySelectorAll('[class*="spacer"]')).map(el => ({tag: el.tagName, class: el.className, height: el.style.height})),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
