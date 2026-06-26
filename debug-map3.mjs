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
  
  // Wait for scrub (simulate) — force progress manually
  const mapST = window.ScrollTrigger ? window.ScrollTrigger.getAll().find(st => st.vars.pin === true) : null;
  
  // Check element at center of viewport
  const el = document.elementFromPoint(720, 450);
  const elInfo = el ? { tag: el.tagName, id: el.id, className: el.className } : null;
  
  // Get all fixed elements
  const allEls = Array.from(document.querySelectorAll('*'));
  const fixedEls = allEls.filter(e => window.getComputedStyle(e).position === 'fixed')
    .map(e => ({ tag: e.tagName, id: e.id, class: e.className.substring(0,40), zIndex: window.getComputedStyle(e).zIndex }));
  
  // Force the map to show its state
  const mapBg = document.getElementById('map-bg');
  const hero = document.getElementById('loc-hero');
  const heroRect = hero.getBoundingClientRect();
  
  return {
    scrollY: window.scrollY,
    elementAtCenter: elInfo,
    fixedEls,
    heroRect: { top: heroRect.top, bottom: heroRect.bottom },
    mapBgStyle: mapBg ? mapBg.getAttribute('style') : 'no style',
    mapSTProgress: mapST ? mapST.progress : null,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
