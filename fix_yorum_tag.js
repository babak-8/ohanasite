const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Replace all occurrences of the div without data-i18n
content = content.replace(
    /<div class="text-xs text-coral-500 mt-0\.5">\s*yorum · Restoran\s*<\/div>/g,
    '<div class="text-xs text-coral-500 mt-0.5" data-i18n="rev_stat_txt">\n                  yorum · Restoran\n                </div>'
);

// Just in case it has different whitespace or encoding
content = content.replace(
    /<div class="text-xs text-coral-500 mt-0\.5">\s*yorum [^<]+<\/div>/g,
    '<div class="text-xs text-coral-500 mt-0.5" data-i18n="rev_stat_txt">\n                  yorum · Restoran\n                </div>'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Replaced yorum · Restoran with data-i18n attribute');
