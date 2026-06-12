const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Replace Gallery 1
content = content.replace(
    /data-src="https:\/\/readdy\.ai[^"]*seq=gallery-1[^"]*"/g,
    'data-src="assets/gallery_1.jpg"'
);
content = content.replace(
    /src="https:\/\/readdy\.ai[^"]*seq=gallery-1[^"]*"/g,
    'src="assets/gallery_1.jpg"'
);

// Replace Gallery 2 (seq=gallery-3)
content = content.replace(
    /data-src="https:\/\/readdy\.ai[^"]*seq=gallery-3[^"]*"/g,
    'data-src="assets/gallery_2.jpg"'
);
content = content.replace(
    /src="https:\/\/readdy\.ai[^"]*seq=gallery-3[^"]*"/g,
    'src="assets/gallery_2.jpg"'
);

// Replace Gallery 3 (seq=gallery-4)
content = content.replace(
    /data-src="https:\/\/readdy\.ai[^"]*seq=gallery-4[^"]*"/g,
    'data-src="assets/gallery_3.jpg"'
);
content = content.replace(
    /src="https:\/\/readdy\.ai[^"]*seq=gallery-4[^"]*"/g,
    'src="assets/gallery_3.jpg"'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Replaced first 3 gallery image URLs');
