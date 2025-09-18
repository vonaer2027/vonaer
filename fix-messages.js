const fs = require('fs');
const path = require('path');

// Function to convert arrays to objects with numbered keys
function convertArraysToObjects(obj) {
  if (Array.isArray(obj)) {
    const result = {};
    obj.forEach((item, index) => {
      if (typeof item === 'object' && item !== null) {
        result[`item${index + 1}`] = convertArraysToObjects(item);
      } else {
        result[`item${index + 1}`] = item;
      }
    });
    return result;
  } else if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = convertArraysToObjects(value);
    }
    return result;
  }
  return obj;
}

// Function to fix a single message file
function fixMessageFile(filePath) {
  try {
    console.log(`Fixing ${filePath}...`);
    const content = fs.readFileSync(filePath, 'utf8');
    const messages = JSON.parse(content);
    const fixedMessages = convertArraysToObjects(messages);
    fs.writeFileSync(filePath, JSON.stringify(fixedMessages, null, 2));
    console.log(`✅ Fixed ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Fix all message files
const messageFiles = ['en.json', 'kr.json', 'jp.json', 'cn.json'];
const messagesDir = path.join(__dirname, 'messages');

messageFiles.forEach(file => {
  const filePath = path.join(messagesDir, file);
  if (fs.existsSync(filePath)) {
    fixMessageFile(filePath);
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('🎉 All message files have been processed!');
