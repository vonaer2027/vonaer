// Comprehensive script to extract media outlet URLs from vonaer.com/advertise
const { chromium } = require('playwright-core');
const fs = require('fs');

async function scrapeMediaOutlets() {
  let browser;
  
  try {
    console.log('🚀 Launching browser...');
    
    browser = await chromium.launch({
      headless: false, // Set to false to see what's happening
      executablePath: process.platform === 'darwin' 
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : undefined
    });
    
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    console.log('🔍 Navigating to vonaer.com/advertise...\n');
    await page.goto('https://www.vonaer.com/advertise', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // Wait for page to fully load
    console.log('⏳ Waiting for content to load...\n');
    await page.waitForTimeout(5000);
    
    // Get all newsroom content items
    console.log('📋 Finding all newsroom content items...\n');
    
    const newsroomItems = await page.evaluate(() => {
      const items = document.querySelectorAll('.newsroom-content');
      return Array.from(items).map((item, index) => {
        const img = item.querySelector('.img') || item.querySelector('img');
        const title = item.querySelector('.title');
        const date = item.querySelector('.date');
        
        return {
          index: index,
          title: title?.textContent?.trim() || 'No title',
          date: date?.textContent?.trim() || 'No date',
          imageUrl: img?.src || img?.getAttribute('src') || 'No image'
        };
      });
    });
    
    console.log(`Found ${newsroomItems.length} newsroom items\n`);
    console.log('─'.repeat(80));
    
    const results = [];
    
    // Try to click each item and capture where it goes
    for (let i = 0; i < newsroomItems.length; i++) {
      const item = newsroomItems[i];
      console.log(`\n${i + 1}/${newsroomItems.length}: ${item.title}`);
      console.log(`   Date: ${item.date}`);
      console.log(`   Image: ${item.imageUrl}`);
      
      try {
        // Navigate back to the main page if needed
        if (page.url() !== 'https://www.vonaer.com/advertise') {
          await page.goto('https://www.vonaer.com/advertise', { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
          });
          await page.waitForTimeout(2000);
        }
        
        // Wait for the item to be available
        await page.waitForSelector('.newsroom-content', { timeout: 5000 });
        
        // Get the specific item again
        const itemElement = await page.locator('.newsroom-content').nth(i);
        
        // Check if it's clickable or wrapped in a link
        const parentLink = await page.evaluate((index) => {
          const items = document.querySelectorAll('.newsroom-content');
          const item = items[index];
          
          // Check if parent is a link
          if (item.parentElement?.tagName === 'A') {
            return item.parentElement.href;
          }
          
          // Check if item itself is a link
          if (item.tagName === 'A') {
            return item.href;
          }
          
          // Check for data attributes
          const dataUrl = item.getAttribute('data-url') || 
                         item.getAttribute('data-href') ||
                         item.getAttribute('data-link');
          if (dataUrl) return dataUrl;
          
          // Check for onclick attribute
          const onclick = item.getAttribute('onclick');
          if (onclick) {
            // Try to extract URL from onclick
            const urlMatch = onclick.match(/(?:window\.open|location\.href|window\.location)\s*[=(]\s*['"]([^'"]+)['"]/);
            if (urlMatch) return urlMatch[1];
          }
          
          return null;
        }, i);
        
        if (parentLink) {
          console.log(`   ✅ URL: ${parentLink}`);
          results.push({
            ...item,
            url: parentLink,
            method: 'direct_link'
          });
          continue;
        }
        
        // If no direct link, try clicking and capturing navigation
        console.log('   🔍 Trying to click and capture navigation...');
        
        // Set up listener for new pages/popups
        const [newPage] = await Promise.race([
          Promise.all([
            context.waitForEvent('page', { timeout: 5000 }),
            itemElement.click({ timeout: 5000 })
          ]).catch(() => [null]),
          new Promise(resolve => setTimeout(() => resolve([null]), 6000))
        ]);
        
        if (newPage) {
          await newPage.waitForLoadState('load', { timeout: 10000 });
          const newUrl = newPage.url();
          console.log(`   ✅ URL (new tab): ${newUrl}`);
          results.push({
            ...item,
            url: newUrl,
            method: 'new_page'
          });
          await newPage.close();
        } else {
          // Check if current page URL changed
          await page.waitForTimeout(2000);
          const currentUrl = page.url();
          
          if (currentUrl !== 'https://www.vonaer.com/advertise') {
            console.log(`   ✅ URL (redirect): ${currentUrl}`);
            results.push({
              ...item,
              url: currentUrl,
              method: 'redirect'
            });
          } else {
            console.log('   ❌ No URL found - item may not be clickable');
            results.push({
              ...item,
              url: null,
              method: 'not_found'
            });
          }
        }
        
      } catch (error) {
        console.log(`   ⚠️ Error processing item: ${error.message}`);
        results.push({
          ...item,
          url: null,
          method: 'error',
          error: error.message
        });
      }
      
      // Small delay between items
      await page.waitForTimeout(500);
    }
    
    console.log('\n' + '─'.repeat(80));
    console.log('\n📊 SUMMARY\n');
    console.log('─'.repeat(80));
    
    const withUrls = results.filter(r => r.url);
    const withoutUrls = results.filter(r => !r.url);
    
    console.log(`Total items: ${results.length}`);
    console.log(`With URLs: ${withUrls.length}`);
    console.log(`Without URLs: ${withoutUrls.length}\n`);
    
    if (withUrls.length > 0) {
      console.log('✅ Successfully extracted URLs:\n');
      withUrls.forEach((item, i) => {
        console.log(`${i + 1}. ${item.title}`);
        console.log(`   URL: ${item.url}`);
        console.log(`   Method: ${item.method}\n`);
      });
    }
    
    if (withoutUrls.length > 0) {
      console.log('\n❌ Items without URLs:\n');
      withoutUrls.forEach((item, i) => {
        console.log(`${i + 1}. ${item.title}`);
      });
    }
    
    // Save to JSON file
    const output = {
      extractedAt: new Date().toISOString(),
      source: 'https://www.vonaer.com/advertise',
      totalItems: results.length,
      itemsWithUrls: withUrls.length,
      itemsWithoutUrls: withoutUrls.length,
      items: results
    };
    
    fs.writeFileSync('media-outlets-complete.json', JSON.stringify(output, null, 2));
    console.log('\n💾 Complete data saved to media-outlets-complete.json');
    
    // Generate TypeScript-ready code
    console.log('\n📝 Generating TypeScript code...\n');
    
    const tsCode = `// Newsroom Articles with Media Outlet URLs
const newsroomArticles = [
${results.map(item => `  {
    id: ${item.index + 1},
    title: '${item.title.replace(/'/g, "\\'")}',
    date: '${item.date}',
    category: 'News', // Update category as needed
    image: '${item.imageUrl}',
    url: ${item.url ? `'${item.url}'` : 'null'} // ${item.url ? '✅ Found' : '❌ Not found'}
  }`).join(',\n')}
]`;
    
    fs.writeFileSync('newsroom-articles-with-urls.ts', tsCode);
    console.log('📝 TypeScript code saved to newsroom-articles-with-urls.ts');
    
    console.log('\n' + '─'.repeat(80));
    console.log('✅ Scraping complete!');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
  } finally {
    if (browser) {
      console.log('\n🔚 Closing browser...');
      await browser.close();
    }
  }
}

// Run the scraper
scrapeMediaOutlets();

