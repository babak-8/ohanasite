const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Replace all variations of the old number with the new one
content = content.replace(/905383341027/g, '905303831317');
content = content.replace(/\+905383341027/g, '+905303831317');
content = content.replace(/\+90 538 334 10 27/g, '+90 530 383 13 17');

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('WhatsApp and phone numbers updated.');
