const fs = require('fs');
const path = require('path');

// Create an SVG version that can be easily converted to PNG
const createKoreanCoverSVG = () => {
  const svgContent = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
    
    <radialGradient id="glowEffect" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Background glow effects -->
  <circle cx="240" cy="150" r="200" fill="url(#glowEffect)"/>
  <circle cx="960" cy="480" r="180" fill="url(#glowEffect)"/>
  
  <!-- Background pattern -->
  <g opacity="0.1">
    <circle cx="100" cy="100" r="2" fill="#60a5fa"/>
    <circle cx="200" cy="150" r="1.5" fill="#60a5fa"/>
    <circle cx="300" cy="80" r="1" fill="#60a5fa"/>
    <circle cx="1000" cy="120" r="2" fill="#60a5fa"/>
    <circle cx="1100" cy="200" r="1.5" fill="#60a5fa"/>
    <circle cx="950" cy="50" r="1" fill="#60a5fa"/>
    <circle cx="150" cy="500" r="1.5" fill="#60a5fa"/>
    <circle cx="1050" cy="550" r="2" fill="#60a5fa"/>
  </g>
  
  <!-- Logo element -->
  <circle cx="1080" cy="100" r="40" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
  <text x="1080" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#60a5fa">V</text>
  
  <!-- Main content -->
  <g transform="translate(600, 315)">
    <!-- Main title VONAER -->
    <text x="0" y="-80" text-anchor="middle" font-family="Arial, sans-serif" font-size="96" font-weight="900" fill="url(#textGradient)" letter-spacing="-2px">VONAER</text>
    
    <!-- Korean title 본에어 -->
    <text x="0" y="-10" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="800" fill="#60a5fa" letter-spacing="2px">본에어</text>
    
    <!-- Accent line -->
    <rect x="-60" y="15" width="120" height="4" fill="url(#accentGradient)" rx="2"/>
    
    <!-- Subtitle -->
    <text x="0" y="55" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#cbd5e1" letter-spacing="0.5px">도시 항공 모빌리티의 새로운 시대</text>
    
    <!-- Tagline -->
    <text x="0" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="#94a3b8" letter-spacing="1px">프리미엄 항공 여행의 혁신적 플랫폼</text>
  </g>
  
  <!-- Decorative elements -->
  <g opacity="0.3">
    <path d="M50,580 Q150,560 250,580 T450,580" stroke="#60a5fa" stroke-width="2" fill="none"/>
    <path d="M750,50 Q850,70 950,50 T1150,50" stroke="#60a5fa" stroke-width="2" fill="none"/>
  </g>
</svg>`;

  return svgContent;
};

// Save the SVG file
const svgContent = createKoreanCoverSVG();
const outputPath = path.join(__dirname, 'public', 'vonaer-korean-cover.svg');

fs.writeFileSync(outputPath, svgContent, 'utf8');

console.log('✅ Korean cover image created successfully!');
console.log(`📁 Saved to: ${outputPath}`);
console.log('');
console.log('📋 Cover Details:');
console.log('   Title: VONAER');
console.log('   Korean Title: 본에어');
console.log('   Subtitle: 도시 항공 모빌리티의 새로운 시대');
console.log('   Tagline: 프리미엄 항공 여행의 혁신적 플랫폼');
console.log('   Dimensions: 1200x630px (optimal for social media)');
console.log('');
console.log('🎨 To convert to PNG:');
console.log('   1. Open the SVG file in a browser');
console.log('   2. Take a screenshot, or');
console.log('   3. Use an online SVG to PNG converter');
console.log('   4. Or use: npx svg2png vonaer-korean-cover.svg vonaer-korean-cover.png');

// Also create a simple HTML version for easy viewing
const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VONAER 본에어 Cover</title>
    <style>
        body { margin: 0; padding: 20px; background: #f1f5f9; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .container { box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden; }
    </style>
</head>
<body>
    <div class="container">
        ${svgContent}
    </div>
</body>
</html>`;

const htmlPath = path.join(__dirname, 'public', 'vonaer-korean-cover.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log(`📄 HTML preview: ${htmlPath}`);


