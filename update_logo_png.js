const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Replace favicon
content = content.replace('href="assets/logo.jpg"', 'href="assets/logo.png"');

// Replace navbar logo
content = content.replace(
    /src="assets\/logo_transparent\.png"/g,
    'src="assets/logo.png"'
);

// Add brightness-0 invert to navbar logo to make it white
content = content.replace(
    'class="h-16 w-auto md:h-20 object-contain hover:opacity-80 transition-opacity drop-shadow-md"',
    'class="h-16 w-auto md:h-20 object-contain hover:opacity-80 transition-opacity drop-shadow-md brightness-0 invert"'
);

// Replace hero and footer logos
content = content.replace(/src="assets\/logo\.jpg"/g, 'src="assets/logo.png"');

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('New PNG logo set successfully.');
