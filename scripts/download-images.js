import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const dirs = [
  'public/images/dateSyrup',
  'public/images/honey',
  'public/images/dates',
  'public/images/nuts',
  'public/images/spices',
  'public/images/juices'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Load products.json
const productsPath = path.join(__dirname, 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Helper to sanitize file names
function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9-_\.]/g, '_');
}

// Helper to infer category from product name (simple keyword matching)
function inferCategory(name) {
  const lower = name.toLowerCase();
  if (lower.includes('biscuit') || lower.includes('cookie')) return 'biscuits';
  if (lower.includes('chocolate')) return 'chocolate';
  if (lower.includes('date syrup')) return 'dateSyrup';
  if (lower.includes('honey')) return 'honey';
  if (lower.includes('date')) return 'dates';
  if (lower.includes('nut') || lower.includes('almond') || lower.includes('pistachio') || lower.includes('cashew') || lower.includes('walnut') || lower.includes('hazelnut')) return 'nuts';
  if (lower.includes('spice') || lower.includes('masala') || lower.includes('pepper')) return 'spices';
  if (lower.includes('juice') || lower.includes('drink')) return 'juices';
  if (lower.includes('wafer')) return 'wafers';
  if (lower.includes('ramen')) return 'ramen';
  if (lower.includes('olive oil') || lower.includes('oil')) return 'olive_oils';
  if (lower.includes('milk powder')) return 'milk_powder';
  if (lower.includes('chips')) return 'chips';
  if (lower.includes('marshmallow')) return 'marshmallows';
  if (lower.includes('toy')) return 'toys';
  if (lower.includes('seed')) return 'seeds';
  if (lower.includes('powder')) return 'juice_powders';
  if (lower.includes('mixed')) return 'mixed';
  return 'other';
}

// Build download list from products.json
const downloadList = products.map(product => {
  let ext = path.extname(product.image_url.split('?')[0]) || '.jpg';
  let fileName = sanitizeFileName(product.name).toLowerCase() + ext.toLowerCase();
  let category = inferCategory(product.name);
  let categoryDir = path.join(__dirname, '..', 'public', 'images', category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
  let dest = path.join(categoryDir, fileName);
  return { url: product.image_url, filename: fileName, dest };
});

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log(`\nDownloading product images...`);
  for (const { url, filename, dest } of downloadList) {
    // Skip if file already exists
    if (fs.existsSync(dest)) {
      console.log(`Skipped (exists): ${filename}`);
      continue;
    }
    try {
      await downloadImage(url, dest);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
  console.log('\nDownload complete!');
}

downloadAll();

