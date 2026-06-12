const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Replace both occurrences of the ohana-about image URL with 'assets/about.jpg'
content = content.replace(
    /src="https:\/\/readdy\.ai[^"]*seq=ohana-about[^"]*"/g,
    'src="assets/about.jpg"'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Replaced about image URL with assets/about.jpg');
