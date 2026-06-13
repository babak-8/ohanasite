const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// 1. Replace Navbar Logo URL and remove invert brightness-0
content = content.replace(
    'src="https://public.readdy.ai/ai/img_res/9bf7e42e-8028-4bb4-a44d-d6b6ec0d013b.png"',
    'src="assets/logo.jpg"'
);
content = content.replace(
    'class="h-16 w-16 md:h-20 md:w-20 object-contain invert brightness-0"',
    'class="h-16 w-16 md:h-20 md:w-20 object-cover rounded-full shadow-md border-2 border-white/20"'
);

// 2. Replace Hero and Footer Logo URLs
content = content.replace(
    /src="https:\/\/static\.readdy\.ai\/image\/359dcf8f0c1a9000baa87c0d5ca1427c\/b3550de0ddd277c1f28ec577f4f6f91b\.jpeg"/g,
    'src="assets/logo.jpg"'
);

// 3. Update Favicon
content = content.replace(
    '<link rel="icon" type="image/svg+xml" href="/vite.svg" />',
    '<link rel="icon" type="image/jpeg" href="assets/logo.jpg" />'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Logo updated across index.php');
