import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url   = process.argv[2] || 'http://localhost:3001';
const label = process.argv[3] || '';
const dir   = './screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const files  = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
const nums   = files.map(f => parseInt(f.match(/^(\d+)/)?.[1] || '0'));
const next   = (nums.length ? Math.max(...nums) : 0) + 1;
const fname  = path.join(dir, `${String(next).padStart(3,'0')}${label ? '-' + label : ''}.png`);

const browser = await puppeteer.launch({ headless: 'new' });
const page    = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1200));
await page.screenshot({ path: fname, fullPage: true });
await browser.close();
console.log('Screenshot:', fname);
