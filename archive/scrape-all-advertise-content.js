// Comprehensive script to extract ALL content URLs from vonaer.com/advertise
const { chromium } = require('playwright-core');
const fs = require('fs');

async function scrapeAllContent() {
  let browser;
  
  try {
    console.log('🚀 Launching browser (headless mode)...');
    
    browser = await chromium.launch({
      headless: true, // Headless mode
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
    
    console.log('⏳ Waiting for content to load...\n');
    await page.waitForTimeout(5000);
    
    // Extract all sections and their content
    const allContent = await page.evaluate(() => {
      const results = {
        newsroom: [],
        newsletter: [],
        notices: [],
        videos: [],
        other: []
      };
      
      // Helper function to extract data from content items
      const extractItemData = (item, index) => {
        const img = item.querySelector('.img, img');
        const title = item.querySelector('.title, h3, h4');
        const date = item.querySelector('.date');
        const category = item.querySelector('.category, [class*="badge"]');
        
        return {
          index: index,
          title: title?.textContent?.trim() || 'No title',
          date: date?.textContent?.trim() || 'No date',
          category: category?.textContent?.trim() || 'Uncategorized',
          imageUrl: img?.src || img?.getAttribute('src') || 'No image',
          className: item.className,
          parentClassName: item.parentElement?.className || ''
        };
      };
      
      // 1. NEWSROOM CONTENT
      const newsroomItems = document.querySelectorAll('.newsroom-content, [class*="newsroom"]');
      results.newsroom = Array.from(newsroomItems).map((item, index) => 
        extractItemData(item, index)
      );
      
      // 2. NEWSLETTER CONTENT
      const newsletterItems = document.querySelectorAll('.newsletter-content, [class*="newsletter"]');
      results.newsletter = Array.from(newsletterItems).map((item, index) => 
        extractItemData(item, index)
      );
      
      // 3. NOTICES CONTENT
      const noticeItems = document.querySelectorAll('.notice-content, [class*="notice"]');
      results.notices = Array.from(noticeItems).map((item, index) => 
        extractItemData(item, index)
      );
      
      // 4. VIDEO CONTENT
      const videoItems = document.querySelectorAll('[class*="video"], .video-item');
      results.videos = Array.from(videoItems).map((item, index) => 
        extractItemData(item, index)
      );
      
      // 5. Find ALL clickable content cards/items (catch-all)
      const allCards = document.querySelectorAll(`
        [class*="content"],
        [class*="card"],
        [class*="item"],
        .article,
        [class*="post"]
      `);
      
      const seenTitles = new Set();
      allCards.forEach((card, index) => {
        const img = card.querySelector('img');
        const title = card.querySelector('[class*="title"], h1, h2, h3, h4, h5');
        const date = card.querySelector('[class*="date"]');
        
        if (img && title) {
          const titleText = title.textContent?.trim();
          if (titleText && !seenTitles.has(titleText)) {
            seenTitles.add(titleText);
            results.other.push({
              index: index,
              title: titleText,
              date: date?.textContent?.trim() || 'No date',
              imageUrl: img.src || img.getAttribute('src') || '',
              className: card.className,
              parentClassName: card.parentElement?.className || ''
            });
          }
        }
      });
      
      return results;
    });
    
    console.log('📊 CONTENT FOUND:\n');
    console.log(`  Newsroom items: ${allContent.newsroom.length}`);
    console.log(`  Newsletter items: ${allContent.newsletter.length}`);
    console.log(`  Notice items: ${allContent.notices.length}`);
    console.log(`  Video items: ${allContent.videos.length}`);
    console.log(`  Other items: ${allContent.other.length}`);
    console.log('\n' + '─'.repeat(80) + '\n');
    
    // Process all sections
    const allResults = {
      newsroom: [],
      newsletter: [],
      notices: [],
      videos: [],
      other: []
    };
    
    // Process each section
    for (const [sectionName, items] of Object.entries(allContent)) {
      if (items.length === 0) continue;
      
      console.log(`\n📂 Processing ${sectionName.toUpperCase()} (${items.length} items)\n`);
      console.log('─'.repeat(80));
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(`\n${i + 1}/${items.length}: ${item.title}`);
        console.log(`   Date: ${item.date}`);
        console.log(`   Image: ${item.imageUrl.substring(0, 60)}...`);
        
        try {
          // Navigate back to main page if needed
          if (page.url() !== 'https://www.vonaer.com/advertise') {
            await page.goto('https://www.vonaer.com/advertise', { 
              waitUntil: 'domcontentloaded',
              timeout: 60000 
            });
            await page.waitForTimeout(2000);
          }
          
          // Find the element by matching title and image
          const clickableElement = await page.evaluate((itemData) => {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const titleEl = el.querySelector('[class*="title"], h1, h2, h3, h4');
              const imgEl = el.querySelector('img');
              
              if (titleEl?.textContent?.trim() === itemData.title && 
                  imgEl?.src === itemData.imageUrl) {
                
                // Check for parent link
                if (el.parentElement?.tagName === 'A') {
                  return { type: 'link', url: el.parentElement.href };
                }
                
                // Check if element itself is clickable
                if (el.tagName === 'A') {
                  return { type: 'link', url: el.href };
                }
                
                // Check for data attributes
                const dataUrl = el.getAttribute('data-url') || 
                               el.getAttribute('data-href') ||
                               el.getAttribute('data-link');
                if (dataUrl) {
                  return { type: 'data', url: dataUrl };
                }
                
                return { type: 'clickable', selector: el.className };
              }
            }
            return null;
          }, item);
          
          if (clickableElement?.url) {
            console.log(`   ✅ URL: ${clickableElement.url}`);
            allResults[sectionName].push({
              ...item,
              url: clickableElement.url,
              method: clickableElement.type
            });
            continue;
          }
          
          // Try clicking if we found a clickable element
          if (clickableElement?.selector) {
            console.log('   🔍 Attempting click...');
            
            const selector = `.${clickableElement.selector.split(' ')[0]}`;
            const elements = await page.$$(selector);
            
            for (const element of elements) {
              const elementTitle = await element.evaluate(el => {
                const titleEl = el.querySelector('[class*="title"], h1, h2, h3, h4');
                return titleEl?.textContent?.trim();
              });
              
              if (elementTitle === item.title) {
                // Set up listener for new pages
                const [newPage] = await Promise.race([
                  Promise.all([
                    context.waitForEvent('page', { timeout: 5000 }),
                    element.click({ timeout: 5000 })
                  ]).catch(() => [null]),
                  new Promise(resolve => setTimeout(() => resolve([null]), 6000))
                ]);
                
                if (newPage) {
                  await newPage.waitForLoadState('load', { timeout: 10000 }).catch(() => {});
                  const newUrl = newPage.url();
                  console.log(`   ✅ URL (new tab): ${newUrl}`);
                  allResults[sectionName].push({
                    ...item,
                    url: newUrl,
                    method: 'new_page'
                  });
                  await newPage.close();
                  break;
                } else {
                  // Check for redirect
                  await page.waitForTimeout(2000);
                  const currentUrl = page.url();
                  
                  if (currentUrl !== 'https://www.vonaer.com/advertise') {
                    console.log(`   ✅ URL (redirect): ${currentUrl}`);
                    allResults[sectionName].push({
                      ...item,
                      url: currentUrl,
                      method: 'redirect'
                    });
                    break;
                  }
                }
              }
            }
            
            // If we didn't find URL, mark as not found
            if (!allResults[sectionName].find(r => r.title === item.title)) {
              console.log('   ❌ No URL found');
              allResults[sectionName].push({
                ...item,
                url: null,
                method: 'not_found'
              });
            }
          } else {
            console.log('   ❌ Element not clickable or not found');
            allResults[sectionName].push({
              ...item,
              url: null,
              method: 'not_clickable'
            });
          }
          
        } catch (error) {
          console.log(`   ⚠️ Error: ${error.message}`);
          allResults[sectionName].push({
            ...item,
            url: null,
            method: 'error',
            error: error.message
          });
        }
        
        await page.waitForTimeout(500);
      }
    }
    
    // Generate summary
    console.log('\n\n' + '═'.repeat(80));
    console.log('📊 FINAL SUMMARY');
    console.log('═'.repeat(80) + '\n');
    
    let totalItems = 0;
    let totalWithUrls = 0;
    let totalWithoutUrls = 0;
    
    for (const [section, items] of Object.entries(allResults)) {
      if (items.length === 0) continue;
      
      const withUrls = items.filter(i => i.url);
      const withoutUrls = items.filter(i => !i.url);
      
      totalItems += items.length;
      totalWithUrls += withUrls.length;
      totalWithoutUrls += withoutUrls.length;
      
      console.log(`📂 ${section.toUpperCase()}`);
      console.log(`   Total: ${items.length}`);
      console.log(`   ✅ With URLs: ${withUrls.length}`);
      console.log(`   ❌ Without URLs: ${withoutUrls.length}\n`);
    }
    
    console.log('─'.repeat(80));
    console.log(`📊 GRAND TOTAL: ${totalItems} items`);
    console.log(`   ✅ Successfully extracted: ${totalWithUrls} URLs`);
    console.log(`   ❌ Failed to extract: ${totalWithoutUrls} URLs`);
    console.log(`   Success rate: ${((totalWithUrls / totalItems) * 100).toFixed(1)}%`);
    
    // Save complete data
    const output = {
      extractedAt: new Date().toISOString(),
      source: 'https://www.vonaer.com/advertise',
      summary: {
        totalItems,
        totalWithUrls,
        totalWithoutUrls,
        successRate: `${((totalWithUrls / totalItems) * 100).toFixed(1)}%`
      },
      sections: allResults
    };
    
    fs.writeFileSync('advertise-complete-data.json', JSON.stringify(output, null, 2));
    console.log('\n💾 Complete data saved to advertise-complete-data.json');
    
    // Generate organized TypeScript code
    let tsCode = '// Complete content from vonaer.com/advertise\n\n';
    
    for (const [section, items] of Object.entries(allResults)) {
      if (items.length === 0) continue;
      
      tsCode += `// ${section.toUpperCase()} (${items.length} items)\n`;
      tsCode += `const ${section}Articles = [\n`;
      tsCode += items.map((item, idx) => `  {
    id: ${idx + 1},
    title: '${item.title.replace(/'/g, "\\'")}',
    date: '${item.date}',
    category: '${item.category}',
    image: '${item.imageUrl}',
    url: ${item.url ? `'${item.url}'` : 'null'}${item.url ? ' // ✅' : ' // ❌'}
  }`).join(',\n');
      tsCode += '\n]\n\n';
    }
    
    fs.writeFileSync('advertise-all-articles.ts', tsCode);
    console.log('📝 TypeScript code saved to advertise-all-articles.ts\n');
    
    console.log('═'.repeat(80));
    console.log('✅ SCRAPING COMPLETE!');
    console.log('═'.repeat(80));
    
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
scrapeAllContent();

