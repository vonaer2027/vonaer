// Script to upload hero videos to Vercel Blob
// Run with: node scripts/upload-videos-to-blob.js

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function uploadVideos() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.error('Error: BLOB_READ_WRITE_TOKEN not found in .env.local');
    console.log('\nTo get the token:');
    console.log('1. Go to Vercel Dashboard → Your Project → Storage');
    console.log('2. Create a new Blob store (or use existing)');
    console.log('3. Copy the BLOB_READ_WRITE_TOKEN from Settings');
    console.log('4. Add to .env.local: BLOB_READ_WRITE_TOKEN=your_token');
    process.exit(1);
  }

  const videos = [
    { name: 'hero_video.mp4', path: 'public/hero/hero_video.mp4' },
    { name: 'hero_video_mobile.mp4', path: 'public/hero/hero_video_mobile.mp4' }
  ];

  const uploadedUrls = {};

  for (const video of videos) {
    const filePath = path.join(process.cwd(), video.path);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    const fileSize = fs.statSync(filePath).size;
    console.log(`\nUploading ${video.name} (${(fileSize / 1024 / 1024).toFixed(2)} MB)...`);

    try {
      const fileBuffer = fs.readFileSync(filePath);

      const blob = await put(video.name, fileBuffer, {
        access: 'public',
        token: token,
        contentType: 'video/mp4',
      });

      console.log(`✓ Uploaded: ${blob.url}`);
      uploadedUrls[video.name] = blob.url;
    } catch (error) {
      console.error(`✗ Failed to upload ${video.name}:`, error.message);
    }
  }

  if (Object.keys(uploadedUrls).length > 0) {
    console.log('\n=== UPLOADED VIDEO URLS ===');
    for (const [name, url] of Object.entries(uploadedUrls)) {
      console.log(`${name}: ${url}`);
    }
    console.log('\nUpdate your hero.tsx with these URLs.');
  }
}

uploadVideos();
