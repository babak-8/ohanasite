const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

const newAddress = 'Oba, atatürk cad. ihsan önen sitesi no:3/16, 07400 Alanya/Antalya';

// Replace in HTML
content = content.replace(
    />\s*Oba, Alanya\/Antalya\s*<\/div>/g,
    '>\n                      ' + newAddress + '\n                    </div>'
);
content = content.replace(
    />Oba, Alanya\/Antalya<\/p>/g,
    '>' + newAddress + '</p>'
);

// Replace in JSON translations
content = content.replace(
    /map_addr:\s*"[^"]*",/g,
    'map_addr: "' + newAddress + '",'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Address updated successfully.');
