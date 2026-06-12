const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

content = content.replace(
    /<span class="block">Deniz Kenarında<\/span/g,
    '<span class="block" data-i18n="atm_t1">Deniz Kenarında</span'
);

content = content.replace(
    /<span class="text-sm text-coral-700"[\s\n\r]*>Her Gün Açık · 00:00'a Kadar<\/span/g,
    '<span class="text-sm text-coral-700" data-i18n="res_hours_v">Her Gün Açık · 00:00\'a Kadar</span'
);

content = content.replace(
    /<span class="block">Tutkuyla<\/span/g,
    '<span class="block" data-i18n="about_t1">Tutkuyla</span'
);

content = content.replace(
    /<span class="block">Kişinin<\/span/g,
    '<span class="block" data-i18n="rev_kisi">Kişinin</span'
);

content = content.replace(
    /errSpan\.innerText = '';/g,
    "errSpan.innerText = '';\n                errSpan.removeAttribute('data-i18n');"
);

content = content.replace(
    /errSpan\.innerText = i18n\[currentLang\]\[message\] \|\| message;/g,
    "errSpan.setAttribute('data-i18n', message);\n                        errSpan.innerText = i18n[currentLang][message] || message;"
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log("Replacements applied.");
