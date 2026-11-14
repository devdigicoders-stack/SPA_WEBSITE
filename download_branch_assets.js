const fs = require('fs');
const path = require('path');
const https = require('https');

let html = fs.readFileSync('raw_branches.html', 'utf8');
html = html.replace(/&#x2F;/g, '/');

const regex = /(?:src|poster|href)=["'](\/assets\/[^"']+)["']/g;
const missing = new Set();
let match;
while ((match = regex.exec(html)) !== null) {
  const cleanUrl = match[1].split('?')[0];
  const localPath = path.join(__dirname, 'public', cleanUrl);
  if (!fs.existsSync(localPath)) {
    missing.add(cleanUrl);
  }
}

const list = Array.from(missing);
console.log(`Starting download of ${list.length} assets...`);

function downloadOne(relUrl) {
  return new Promise((resolve) => {
    const fullUrl = `https://laguna.global${relUrl}`;
    const dest = path.join(__dirname, 'public', relUrl);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    const file = fs.createWriteStream(dest);
    https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', () => { fs.unlink(dest, () => {}); resolve(); });
        return;
      }
      if (res.statusCode !== 200) {
        console.warn(`Status ${res.statusCode} for ${relUrl}`);
        file.close();
        fs.unlink(dest, () => {});
        return resolve();
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Done: ${relUrl}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error on ${relUrl}:`, err.message);
      fs.unlink(dest, () => {});
      resolve();
    });
  });
}

async function run() {
  const concurrency = 6;
  for (let i = 0; i < list.length; i += concurrency) {
    const chunk = list.slice(i, i + concurrency);
    await Promise.all(chunk.map(downloadOne));
  }
  console.log('All branch gallery images downloaded!');
}

run();

