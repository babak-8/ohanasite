const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// 1. Remove all old/long toast_success lines and corrupted Russian lines
content = content.replace(/toast_success:\s*"Rezervasyonunuz ba\S+r\S+yla al\S+nd\S+! Size en k\S+sa s\S+rede d\S+n\S+ yapaca\S+z\.",/g, '');
content = content.replace(/toast_success:\s*"\?\?\?\? \?\?\?\?\?\?\?\?\?\?\?\? \?\?\?\?\?\?\?! \?\? \?\?\?\?\?\?\?\? \? \?\?\?\? \? \?\?\?\?\?\?\?\?\? \?\?\?\?\.",/g, '');
content = content.replace(/toast_success:\s*"Ihre Reservierung ist eingegangen! Wir werden uns in K\S+rze bei Ihnen melden\.",/g, '');

// 2. Ensure each language has exactly one toast_success, so let's just do a clean replace 
// for the ones we added earlier.
content = content.replace(/toast_success:\s*"Rezervasyonunuz alındı\.",/g, 'toast_success: "Rezervasyonunuz alındı. En kısa sürede dönüş yapacağız.",');
content = content.replace(/toast_success:\s*"Reservation received\.",/g, 'toast_success: "Reservation received. We will contact you shortly.",');
content = content.replace(/toast_success:\s*"Reservierung erhalten\.",/g, 'toast_success: "Reservierung erhalten. Wir melden uns in Kürze.",');
// The Russian one might be missing if the previous replace failed.
// Let's add it right after err_seating for Russian
content = content.replace(
    /err_seating:\s*"Пожалуйста, выберите предпочтение по местам\.",/g,
    'err_seating: "Пожалуйста, выберите предпочтение по местам.",\n          toast_success: "Бронирование получено. Мы свяжемся с вами в ближайшее время.",'
);

// 3. Fix the toast container and HTML structure to be a single line
// Remove flex-col from toast container and toast class
content = content.replace(
    /id="toast-container" class="([^"]*?) flex-col ([^"]*?)"/g,
    'id="toast-container" class="$1 $2"'
);

content = content.replace(
    /toast\.className = `flex flex-col items-center justify-center text-center gap-2 (.*?)`;/g,
    'toast.className = `flex items-center gap-3 w-max max-w-[95vw] $1`;'
);

content = content.replace(
    /toast\.innerHTML = `<div class="flex items-center justify-center gap-2">\$\{icon\}<\/div> <span>\$\{message\}<\/span>`;/g,
    'toast.innerHTML = `${icon} <span class="whitespace-nowrap text-xs sm:text-sm">${message}</span>`;'
);

// Ensure the container allows wide toast
content = content.replace(
    /w-\[90%\] md:w-auto max-w-md items-center md:items-end/g,
    'w-full sm:w-auto px-4 flex-col items-center md:items-end'
);

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Toast layout set to single line and text updated.');
