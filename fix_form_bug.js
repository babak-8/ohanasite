const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// Add required attributes to inputs
content = content.replace(/name="name"/g, 'name="name" required');
content = content.replace(/name="phone"/g, 'name="phone" required');
content = content.replace(/name="date"/g, 'name="date" required');
content = content.replace(/name="time"/g, 'name="time" required');
content = content.replace(/name="guests"/g, 'name="guests" required');

// The seating preference is a radio or select? Let's check
// We will just add required to the inputs that match.

// Update toast text
content = content.replace(
    /toast_success:\s*"Rezervasyonunuz baaryla alnd! Size en ksa srede dn yapacaz\."/g,
    'toast_success: "Rezervasyonunuz alındı."'
);
content = content.replace(
    /toast_success:\s*"Your reservation has been received! We will get back to you shortly\."/g,
    'toast_success: "Reservation received."'
);
content = content.replace(
    /toast_success:\s*"Ihre Reservierung ist eingegangen! Wir werden uns in Krze bei Ihnen melden\."/g,
    'toast_success: "Reservierung erhalten."'
);
// For Russian with question marks
content = content.replace(
    /toast_success:\s*"\?\?\?\? \?\?\?\?\?\?\?\?\?\?\?\? \?\?\?\?\?\?\?! \?\? \?\?\?\?\?\?\?\? ?\w* ?\w* ?\w*"/g,
    'toast_success: "Бронирование получено."'
);
content = content.replace(
    /toast_success:\s*".*?Бронирование.*?"/g,
    'toast_success: "Бронирование получено."'
);

// We should also replace the default toast message in JS (line 1578)
content = content.replace(
    /showToast\(i18n\[currentLang\]\['toast_success'\] \|\| 'Rezervasyonunuz baaryla alnd!', 'success'\);/g,
    "showToast(i18n[currentLang]['toast_success'] || 'Rezervasyonunuz alındı.', 'success');"
);

// Fix the Russian text if it is corrupted in the original file
content = content.replace(
    /toast_success:\s*".*?\?\?\?\?\?\?.*?"/g,
    'toast_success: "Бронирование получено."'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Inputs made required and toast messages shortened.');
