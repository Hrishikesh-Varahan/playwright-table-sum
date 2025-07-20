// scrape_sum.mjs
import { chromium } from 'playwright';

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=60',
  'https://sanand0.github.io/tdsdata/js_table/?seed=61',
  'https://sanand0.github.io/tdsdata/js_table/?seed=62',
  'https://sanand0.github.io/tdsdata/js_table/?seed=63',
  'https://sanand0.github.io/tdsdata/js_table/?seed=64',
  'https://sanand0.github.io/tdsdata/js_table/?seed=65',
  'https://sanand0.github.io/tdsdata/js_table/?seed=66',
  'https://sanand0.github.io/tdsdata/js_table/?seed=67',
  'https://sanand0.github.io/tdsdata/js_table/?seed=68',
  'https://sanand0.github.io/tdsdata/js_table/?seed=69',
];

async function scrapeAndSum(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const sum = await page.evaluate(() => {
    let total = 0;
    const tds = Array.from(document.querySelectorAll('table td'));
    for (const cell of tds) {
      const n = Number(cell.textContent.trim());
      if (!Number.isNaN(n)) total += n;
    }
    return total;
  });
  await browser.close();
  return sum;
}

(async () => {
  let grandTotal = 0;
  for (const url of urls) {
    const s = await scrapeAndSum(url);
    grandTotal += s;
  }
  // Important: Print for GitHub Action log
  console.log("Grand Total of All Table Numbers:", grandTotal);
})();
