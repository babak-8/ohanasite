const fs = require('fs');
let content = fs.readFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', 'utf8');

// The file might have corrupted fetch promise chain. Let's find the exact area and fix it.
// The area starts at "fetch('https://formsubmit.co/ajax/babirapson19@gmail.com'"
// and ends somewhere around "this.reset();"

const regex = /fetch\('https:\/\/formsubmit\.co\/ajax\/babirapson19@gmail\.com'[\s\S]*?this\.reset\(\);\s*\}\s*else if \(data\.status === 'error'\)/;

const fixedCode = `fetch('https://formsubmit.co/ajax/babirapson19@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === "true" || data.status === "success") {
                showToast(i18n[currentLang]['toast_success'] || 'Rezervasyonunuz alındı.', 'success');
                this.reset();
            } else if (data.status === 'error')`;

if (content.match(regex)) {
    content = content.replace(regex, fixedCode);
} else {
    // Maybe the corruption was slightly different, let's try a broader match
    const backupRegex = /fetch\('https:\/\/formsubmit\.co\/ajax\/babirapson19@gmail\.com'[\s\S]*?else if \(data\.status === 'error'\)/;
    content = content.replace(backupRegex, fixedCode);
}

// Ensure the Russian string is correctly written
content = content.replace(/toast_success:\s*"Бронирование получено\.",/g, 'toast_success: "Бронирование получено.",');

fs.writeFileSync('C:\\xampp\\htdocs\\ohana_beach\\index.php', content, 'utf8');
console.log('Fixed fetch syntax block.');
