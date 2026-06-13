const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// 1. Revert Hero logo to logo.jpg and remove brightness-0 invert
content = content.replace(
    /class="([^"]*)brightness-0 invert([^"]*)"\s+src="assets\/logo\.png"/g,
    'class="$1$2" src="assets/logo.jpg"'
);

// 2. Revert Footer logo to logo.jpg
content = content.replace(
    /src="assets\/logo\.png"/g,
    'src="assets/logo.jpg"'
);

// 3. Set Navbar logo to navbar_logo.png and remove brightness-0 invert
// Note: In the previous step, I added brightness-0 invert to navbar logo. 
// Let's find the exact navbar logo tag.
content = content.replace(
    /<img id="navbar-logo" alt="OHANA" class="([^"]*)brightness-0 invert([^"]*)" src="assets\/logo\.jpg">/,
    '<img id="navbar-logo" alt="OHANA" class="$1$2" src="assets/navbar_logo.png">'
);
// In case it's currently using logo.png or logo_transparent.png
content = content.replace(
    /<img id="navbar-logo" alt="OHANA" class="([^"]*)brightness-0 invert([^"]*)" src="assets\/logo(?:_transparent|\.png|\.jpg)[^"]*">/g,
    '<img id="navbar-logo" alt="OHANA" class="$1$2" src="assets/navbar_logo.png">'
);
// In case it doesn't have brightness-0 invert but is using something else
content = content.replace(
    /<img id="navbar-logo" alt="OHANA" class="([^"]*)" src="assets\/logo(?:_transparent|\.png|\.jpg)[^"]*">/g,
    '<img id="navbar-logo" alt="OHANA" class="$1" src="assets/navbar_logo.png">'
);
// Clean up any double spaces in class
content = content.replace(/class="([^"]*)\s\s+([^"]*)"/g, 'class="$1 $2"');
content = content.replace(/class="\s*([^"]*)\s*"/g, 'class="$1"');

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Logos reverted and navbar logo updated.');
