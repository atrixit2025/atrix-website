import express from "express";
import cors from "cors";
import axios from "axios";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { load } from "cheerio";

const app = express();

app.use(cors());
app.use(express.json());

// Add stealth plugin
puppeteer.use(StealthPlugin());

// Configure Puppeteer with retry logic
let browser;
const initBrowser = async () => {
  if (browser && browser.isConnected()) return; // Avoid reinitializing
  browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ],
    timeout: 60000
  });
};

// Initialize browser immediately
initBrowser().catch(console.error);

// Free proxy options with retries
const PROXIES = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
  'https://thingproxy.freeboard.io/fetch/'
];
const BehanceRouter = express.Router();

BehanceRouter.get('/api/images', async (req, res) => {
  let retryCount = 0;
  const maxRetries = 3;
  const username = req.query.username || 'atrixit';

  while (retryCount < maxRetries) {
    try {
      // Try proxies first
      for (const proxy of PROXIES) {
        try {
          const proxyUrl = `${proxy}${encodeURIComponent(`https://www.behance.net/${username}`)}`;
          const response = await axios.get(proxyUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Accept': 'text/html,application/xhtml+xml',
              'Accept-Language': 'en-US,en;q=0.9',
              'Referer': 'https://www.behance.net/'
            },
            timeout: 10000
          });

          const html = response.data;
          const images = extractImages(html);

          if (images.length > 0) {
            return res.json({ success: true, images });
          }
        } catch (proxyError) {
          console.log(`Proxy failed: ${proxyError.message}`);
        }
      }

      // Puppeteer fallback
      try {
        await initBrowser();

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(60000);

        await page.goto(`https://www.behance.net/${username}`, {
          waitUntil: 'networkidle2',
          timeout: 60000
        });

        await page.waitForSelector('img', { timeout: 30000 });
        await autoScroll(page);

        const html = await retryOperation(() => page.content(), 3, 1000);
        const images = extractImages(html);
        await page.close();

        if (images.length > 0) {
          return res.json({ success: true, images });
        }
      } catch (puppeteerError) {
        console.error('Puppeteer error:', puppeteerError.message);
        if (browser) {
          await browser.close();
          browser = null;
        }
      }

      retryCount++;
      if (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (err) {
      console.error('Attempt failed:', err.message);
      retryCount++;
    }
  }

  res.status(500).json({
    success: false,
    error: 'Failed after multiple attempts. Try again later or use a different username.',
    tips: [
      'Some Behance profiles may be private',
      'Try again in a few minutes',
      'Test with username "google" or "adobe"'
    ]
  });
});

// Helper functions
function extractImages(html) {
  const $ = load(html); // Updated to use the named import
  const images = new Set();

  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src && src.includes('behance.net') && /\.(jpg|jpeg|png|webp)$/i.test(src)) {
      images.add(src.split('?')[0].replace(/\/+$/, ''));
    }
  });

  return Array.from(images).slice(0, 20);
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 200;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

async function retryOperation(operation, retries, delay) {
  try {
    return await operation();
  } catch (err) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryOperation(operation, retries - 1, delay);
    }
    throw err;
  }
}

export default BehanceRouter;
