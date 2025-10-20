// Script to extract media outlet URLs from vonaer.com/advertise using Playwright
const { chromium } = require('playwright-core');

async function extractMediaUrls() {
  let browser;
  
  try {
    console.log('🚀 Launching browser...');
    
    // Launch browser
    browser = await chromium.launch({
      headless: true,
      // Use system Chrome if available
      executablePath: process.platform === 'darwin' 
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : undefined
    });
    
    const page = await browser.newPage();
    
    console.log('🔍 Navigating to vonaer.com/advertise...');
    await page.goto('https://www.vonaer.com/advertise', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded\n');
    
    // Wait for newsroom content to load
    await page.waitForSelector('.newsroom-content', { timeout: 10000 });
    
    // Extract all newsroom items with their data
    const mediaOutlets = await page.evaluate(() => {
      const items = document.querySelectorAll('.newsroom-content');
      const results = [];
      
      items.forEach((item, index) => {
        const img = item.querySelector('.img');
        const title = item.querySelector('.title');
        const date = item.querySelector('.date');
        
        // Check for various ways the URL might be stored
        const url = item.getAttribute('data-url') 
               || item.getAttribute('href')
               || item.parentElement?.getAttribute('href')
               || item.onclick?.toString()
               || null;
        
        // Check if parent is an anchor tag
        let actualUrl = null;
        if (item.parentElement?.tagName === 'A') {
          actualUrl = item.parentElement.href;
        } else if (url) {
          actualUrl = url;
        }
        
        results.push({
          index: index + 1,
          title: title?.textContent?.trim() || 'No title',
          date: date?.textContent?.trim() || 'No date',
          imageUrl: img?.src || img?.getAttribute('src') || 'No image',
          linkUrl: actualUrl,
          rawHtml: item.outerHTML.substring(0, 200) + '...'
        });
      });
      
      return results;
    });
    
    console.log('📰 Media Outlets Found:');
    console.log('─'.repeat(80));
    
    if (mediaOutlets.length === 0) {
      console.log('⚠️  No newsroom content found');
    } else {
      mediaOutlets.forEach(outlet => {
        console.log(`\n${outlet.index}. ${outlet.title}`);
        console.log(`   Date: ${outlet.date}`);
        console.log(`   Image: ${outlet.imageUrl}`);
        console.log(`   URL: ${outlet.linkUrl || '❌ No URL found'}`);
      });
      
      console.log('\n' + '─'.repeat(80));
      console.log(`Total media outlets: ${mediaOutlets.length}`);
      console.log(`With URLs: ${mediaOutlets.filter(o => o.linkUrl).length}`);
      console.log(`Without URLs: ${mediaOutlets.filter(o => !o.linkUrl).length}`);
      
      // If no URLs found, let's inspect the HTML structure more
      if (mediaOutlets.every(o => !o.linkUrl)) {
        console.log('\n⚠️  No URLs found. Inspecting HTML structure...\n');
        
        // Get the parent container HTML
        const containerHtml = await page.evaluate(() => {
          const container = document.querySelector('.newsroom-content')?.parentElement;
          return container ? container.outerHTML.substring(0, 500) : 'Container not found';
        });
        
        console.log('Parent container HTML:');
        console.log(containerHtml);
        
        // Check for click handlers
        console.log('\n🔍 Checking for click handlers...');
        const hasClickHandlers = await page.evaluate(() => {
          const items = document.querySelectorAll('.newsroom-content');
          const handlers = [];
          items.forEach((item, i) => {
            const events = getEventListeners ? getEventListeners(item) : null;
            if (item.onclick || (item.parentElement && item.parentElement.onclick)) {
              handlers.push({
                index: i,
                hasOnclick: true,
                parentTag: item.parentElement?.tagName
              });
            }
          });
          return handlers;
        });
        
        if (hasClickHandlers.length > 0) {
          console.log('Found click handlers:', hasClickHandlers);
        } else {
          console.log('No click handlers found');
        }
      }
      
      // Save to file
      const fs = require('fs');
      const output = {
        extractedAt: new Date().toISOString(),
        source: 'https://www.vonaer.com/advertise',
        totalOutlets: mediaOutlets.length,
        outlets: mediaOutlets
      };
      
      fs.writeFileSync('media-outlets-detailed.json', JSON.stringify(output, null, 2));
      console.log('\n💾 Details saved to media-outlets-detailed.json');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  } finally {
    if (browser) {
      await browser.close();
      console.log('\n🔚 Browser closed');
    }
  }
}

// Run the extraction
extractMediaUrls();

