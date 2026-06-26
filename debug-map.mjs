import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ 
  headless: 'new',
  args: ['--enable-webgl', '--use-gl=swiftshader']
});
const page = await browser.newPage();

// Collect console output
const logs = [];
page.on('console', msg => logs.push(msg.type() + ': ' + msg.text()));
page.on('pageerror', err => logs.push('ERROR: ' + err.message));

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3001/locura.html', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1400));

const state = await page.evaluate(() => {
  const hero = document.getElementById('loc-hero');
  const map = document.getElementById('loc-map');
  const mlA = document.getElementById('ml-a');
  const mlB = document.getElementById('ml-b');
  const mlC = document.getElementById('ml-c');
  const mapBg = document.getElementById('map-bg');
  const scrollTriggers = window.ScrollTrigger ? window.ScrollTrigger.getAll().map(st => ({
    trigger: st.vars.trigger,
    progress: st.progress,
    pin: !!st.vars.pin,
    start: st.start,
    end: st.end
  })) : [];
  return {
    scrollY: window.scrollY,
    heroH: hero ? hero.offsetHeight : 0,
    mapH: map ? map.offsetHeight : 0,
    mapOffsetTop: map ? map.offsetTop : 0,
    mlA_opacity: mlA ? mlA.style.opacity : 'N/A',
    mlB_opacity: mlB ? mlB.style.opacity : 'N/A',
    mlC_opacity: mlC ? mlC.style.opacity : 'N/A',
    mapBg_transform: mapBg ? mapBg.style.transform : 'N/A',
    scrollTriggers,
    bodyH: document.body.scrollHeight,
  };
});

console.log(JSON.stringify(state, null, 2));
console.log('\n--- Console logs ---');
logs.forEach(l => console.log(l));

await browser.close();
