const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Replace both occurrences of the ohana-about image URL with 'assets/about.jpg'
content = content.replace(
    /https:\/\/readdy\.ai\/api\/search-image\?query=Warm%20beach%20restaurant%20interior%20with%20coral%20and%20wood%20accents%20mediterranean%20style%20elegant%20dining%20natural%20light%20sunset%20ambiance%20editorial%20photography&amp;width=800&amp;height=600&amp;seq=ohana-about&amp;orientation=landscape/g,
    'assets/about.jpg'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Replaced about image URL with assets/about.jpg');
