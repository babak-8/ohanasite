const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// 1. Update Title
content = content.replace(
    /<title>OHANA BEACH RESTAURANT \| Oba, Alanya<\/title>/i,
    "<title>Ohana Beach Restaurant | Alanya'nın En İyi Dünya Mutfağı & Steakhouse | Oba</title>"
);

// 2. Update Meta Description
content = content.replace(
    /<meta\s+name="description"\s+content="[^"]+"\s*\/>/i,
    '<meta\s+name="description"\s+content="Ohana Beach Restaurant, Oba Alanya\'da deniz kenarında eşsiz bir atmosferde en iyi steakhouse ve dünya mutfağı lezzetlerini sunuyor. Kahvaltı, öğle ve akşam yemeği için hemen rezervasyon yapın." />'
);
// In case the above regex fails due to line breaks:
content = content.replace(
    /<meta[\s\S]*?name="description"[\s\S]*?content="[^"]*"[\s\S]*?\/>/i,
    '<meta name="description" content="Ohana Beach Restaurant, Oba Alanya\'da deniz kenarında eşsiz bir atmosferde en iyi steakhouse ve dünya mutfağı lezzetlerini sunuyor. Kahvaltı, öğle ve akşam yemeği için hemen rezervasyon yapın." />'
);

// 3. Menu Image Alts
// Look for alt="${item.name[currentLang]}"
content = content.replace(
    /alt="\$\{item\.name\[currentLang\]\}"/g,
    'alt="${item.name[currentLang]} - Ohana Beach Restaurant Alanya"'
);

// 4. Hero Texts in i18n
// TR
content = content.replace(/hero_t1:\s*"Akdeniz'in",/, 'hero_t1: "Alanya\'nın En İyi",');
content = content.replace(/hero_t2:\s*"Lezzeti & Ruhu",/, 'hero_t2: "Dünya Mutfağı & Steakhouse",');
// EN
content = content.replace(/hero_t1:\s*"Taste & Spirit",/, 'hero_t1: "Alanya\'s Best",');
content = content.replace(/hero_t2:\s*"of Mediterranean",/, 'hero_t2: "World Cuisine & Steakhouse",');
// RU
content = content.replace(/hero_t1:\s*"Вкус и Дух",/, 'hero_t1: "Лучший в Алании",');
content = content.replace(/hero_t2:\s*"Средиземноморья",/, 'hero_t2: "Мировая кухня и стейкхаус",');
// DE
content = content.replace(/hero_t1:\s*"Geschmack & Geist",/, 'hero_t1: "Alanyas Bestes",');
content = content.replace(/hero_t2:\s*"des Mittelmeers",/, 'hero_t2: "Weltküche & Steakhaus",');

// 5. General image ALTs
content = content.replace(/alt="OHANA"/g, 'alt="Ohana Beach Restaurant Oba Alanya Logo"');
content = content.replace(/alt="OHANA Restaurant"/g, 'alt="Ohana Beach Restaurant Oba Alanya İç Mekan"');
content = content.replace(/alt="OHANA Beach Restaurant"/g, 'alt="Ohana Beach Restaurant Alanya Deniz Kenarı Manzarası"');

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log("SEO updates applied.");
