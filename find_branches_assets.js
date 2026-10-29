const fs = require('fs');
const path = require('path');

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

console.log('Missing assets count:', missing.size);
console.log(Array.from(missing));

